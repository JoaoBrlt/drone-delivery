import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CacheService } from './cache.service';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';
import { DroneHeartbeat } from '../entities/drone-heartbeat.entity';

@Injectable()
export class TrackingRouterService {
  /**
   * Constructs the tracking router service.
   * @param droneHeartbeatRepository The drone heartbeat repository.
   * @param kafkaClient The kafka client.
   * @param cacheService The cache service.
   */
  constructor(
    @InjectRepository(DroneHeartbeat)
    private readonly droneHeartbeatRepository: Repository<DroneHeartbeat>,
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Returns the last known position of a drone.
   * @param droneId The id of the drone whose position we want to know.
   * @param date The date of the last position of the drone we want to know.
   */
  public async trackDrone(droneId: number, date: Date): Promise<DroneHeartbeat> {
    return await this.droneHeartbeatRepository
      .createQueryBuilder('heartbeat')
      .where('heartbeat.droneId = :droneId', { droneId })
      .andWhere('heartbeat.date <= :date ', { date })
      .orderBy('heartbeat.date', 'DESC')
      .getOne();
  }

  /**
   * Updates the position of a drone every time a drone emits his position
   */
  public async updateDronePosition(value: DroneHeartbeatDto) {
    value.date = value.date || new Date();
    this.cacheService.recordNewEntry(value);
  }

  //to change for cacheService change
  public async getAllDronePosition(): Promise<DroneHeartbeatDto[]> {
    return this.cacheService.getLastPing();
  }

  /**
   * Return every position that a drone used to get to its actual position (its route with the drone
   * heartbeats).
   * @param droneId The id of the drone whose route we want to know.
   */
  public async getDroneRoute(droneId: number): Promise<DroneHeartbeat[]> {
    return await this.droneHeartbeatRepository
      .createQueryBuilder('heartbeat')
      .where('heartbeat.droneId = :droneId', { droneId })
      .orderBy('heartbeat.date', 'DESC')
      .getMany();
  }

  /**
   * Return every position that a drone used to get to its actual position for a certain delivery
   * (its route with the drone heartbeats).
   * @param deliveryId The id of the delivery whose progression we want to know.
   */
  public async getDeliveryProgression(deliveryId: string): Promise<DroneHeartbeat[]> {
    return await this.droneHeartbeatRepository
      .createQueryBuilder('heartbeat')
      .where('heartbeat.deliveryId = :deliveryId', { deliveryId })
      .orderBy('heartbeat.date', 'DESC')
      .getMany();
  }
}
