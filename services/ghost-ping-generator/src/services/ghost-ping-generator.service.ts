import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { PathDto } from '../dtos/path.dto';
import { GeoPointDto } from '../dtos/geopoint.dto';
import { DroneStatus } from '../types/drone-status.type';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';
import { DroneRegistryService } from '../external/drone-registry.service';
import { TrackingRouterService } from '../external/tracking-router.service';

@Injectable()
export class GhostPingGeneratorService {
  /**
   * Constructs the ghost ping generator service.
   * @param kafkaClient The Kafka client.
   * @param httpService The HTTP client.
   * @param droneRegistryService The drone registry service.
   * @param trackingRouterService The tracking router service.
   */
  constructor(
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
    private readonly httpService: HttpService,
    private readonly droneRegistryService: DroneRegistryService,
    private readonly trackingRouterService: TrackingRouterService,
  ) {}

  /**
   * The approximated speed of a drone in degrees/s.
   */
  private static SPEED = 0.001;

  /**
   * Generates a ghost ping for a specific drone.
   * @param droneId The drone identifier.
   */
  public async generateGhostPing(droneId: number): Promise<DroneHeartbeatDto> {
    try {
      // Get the path of the drone.
      const path = await this.droneRegistryService.getDronePath(droneId);
      if (!path) {
        console.error('The drone registry did not provide a valid drone path.');
        return;
      }

      // Get the last heartbeat of the drone.
      const lastPing = await this.trackingRouterService.getDroneLastPosition(droneId);
      if (!lastPing) {
        console.error('The tracking router did not provide a valid drone heartbeat.');
        return;
      }

      // Get the elapsed time.
      const elapsedTime = Math.abs(Date.now() - new Date(lastPing.date).getTime()) / 1000;

      // Generate a ghost ping for the drone.
      const ghostPing = GhostPingGeneratorService.generateGhost(path, lastPing, elapsedTime);
      this.kafkaClient.emit('ping-emitted', ghostPing);
      return ghostPing;
    } catch (error) {
      console.error('An error occurred while requesting drone path to drone-registry', error);
      return undefined;
    }
  }

  /**
   * Creates a ghost heartbeat to approximate the drone real position relatively to its last one.
   * @param path a list of positions the drone should follow.
   * @param lastPing the last ping received from the drone.
   * @param elapsedTime the elapsed time (s) since the last ping received from the drone.
   */
  private static generateGhost(path: PathDto, lastPing: DroneHeartbeatDto, elapsedTime: number): DroneHeartbeatDto {
    // Sort the path.
    path.coordinates.sort((a, b) => a.order - b.order);

    // Compute which point the drone was currently going to.
    let next = 0;
    let bestDistance = Number.MAX_VALUE;

    for (let i = 0; i < path.coordinates.length - 1; i++) {
      const A = path.coordinates[i];
      const B = path.coordinates[i + 1];

      // Value used to compare distance of point C to segment [AB].
      const distance = this.dist(lastPing, A) + this.dist(lastPing, B);

      // Keep the best.
      if (distance < bestDistance) {
        bestDistance = distance;
        next = i + 1;
      }
    }

    // Distance from the next destination in the path.
    let nextDistance = GhostPingGeneratorService.dist(lastPing, path.coordinates[next]);

    // Supposed traveled distance since the last ping.
    const traveledDistance = GhostPingGeneratorService.SPEED * elapsedTime;

    // Read just the next destination in function of the supposed traveled distance since the last ping.
    while (nextDistance < traveledDistance && next < path.coordinates.length - 1) {
      next++;
      nextDistance = GhostPingGeneratorService.dist(lastPing, path.coordinates[next]);
    }

    // Compute and return the supposed next position.
    const r = traveledDistance / nextDistance;
    const lat = lastPing.latitude + r * (path.coordinates[next].latitude - lastPing.latitude);
    const long = lastPing.longitude + r * (path.coordinates[next].longitude - lastPing.longitude);

    return {
      droneId: lastPing.droneId,
      date: new Date(Date.now()),
      deliveryId: lastPing.deliveryId,
      isCritical: lastPing.isCritical,
      status: DroneStatus.NO_SIGNAL,
      latitude: lat,
      longitude: long,
      altitude: lastPing.altitude,
    } as DroneHeartbeatDto;
  }

  /**
   * Returns the euclidean distance between two geopoints
   * @param A The first point.
   * @param B The second point.
   */
  private static dist(A: GeoPointDto, B: GeoPointDto): number {
    return Math.sqrt((A.longitude - B.longitude) ** 2 + (A.latitude - B.latitude) ** 2);
  }
}
