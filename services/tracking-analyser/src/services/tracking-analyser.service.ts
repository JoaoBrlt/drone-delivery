import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { NetworkCoverageService } from '../external/network-coverage.service';
import { GhostPingGeneratorService } from '../external/ghost-ping-generator.service';
import { AlertDto, AlertStatus } from '../dtos/alert.dto';
import { CoverageLevel } from '../dtos/coverage-level.dto';

@Injectable()
export class TrackingAnalyserService implements OnModuleInit, OnModuleDestroy {
  /**
   * The limit of ghost pings to send when a drone does not respond before asking the external service.
   */
  private GHOST_LIMIT = 5;

  /**
   * Milliseconds timeout before sending a ghost ping.
   */
  private TIMEOUT = 10000;

  /**
   * A map of counter of consecutive ghost pings emitted for each drone.
   */
  private readonly ghostCounter: { [droneId: number]: number };

  /**
   * Constructs the tracking analyser service.
   * @param schedulerRegistry The scheduler registry.
   * @param networkCoverageAPI The network coverage external service.
   * @param ghostPingGenerator The ghost ping generator service.
   * @param kafkaClient The Kafka client.
   */
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private networkCoverageAPI: NetworkCoverageService,
    private ghostPingGenerator: GhostPingGeneratorService,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {
    this.ghostCounter = {};
  }

  /**
   * Triggered when the module is initialized.
   */
  public async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
    this.kafkaClient.emit('tracking-ready', '');
  }

  /**
   * Triggered when the module is destroyed.
   */
  public async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  public resetRoutine(droneId: number) {
    if (this.isTracked(droneId)) {
      this.endTracking(droneId);
      this.startTracking(droneId);
    }
  }

  public startTrackingForMultiplesDrones(value: number[]) {
    value.forEach((droneId) => {
      this.startTracking(droneId);
    });
  }

  public startTracking(droneId: number) {
    this.ghostCounter[droneId] = this.GHOST_LIMIT;
    this.addTimeout(droneId);
  }

  public endTracking(droneId: number) {
    if (!this.isTracked(droneId)) return; //IF drone is not tracked, we do not stop it
    this.schedulerRegistry.deleteTimeout('drone-' + droneId.toString());
    this.ghostCounter[droneId] = undefined;
  }

  public addTimeout(droneId: number) {
    const timeout = setTimeout(() => this.ghostPing(droneId), this.TIMEOUT);
    this.schedulerRegistry.addTimeout('drone-' + droneId.toString(), timeout);
  }

  private async ghostPing(droneId: number) {
    const ghostPing = await this.ghostPingGenerator.requestGhostPing(droneId);
    if (!ghostPing) {
      this.resetRoutine(droneId); // Reset timeout.
      console.error('ghost ping generation error');
      return;
    }

    this.ghostCounter[droneId]--; //Decrement the counter, started at GHOST_LIMIT

    if (this.ghostCounter[droneId] <= 0) {
      const coverage = await this.networkCoverageAPI.getNetworkCoverage({
        longitude: ghostPing.longitude,
        latitude: ghostPing.latitude,
      });

      console.log('COVERAGE FOR DRONE ', ghostPing.droneId, ' == ', coverage.level);

      // No or low signal.
      if (coverage.level === CoverageLevel.NONE || coverage.level === CoverageLevel.LOW) {
        this.resetRoutine(droneId);
      }

      // Signal.
      else {
        const al: AlertDto = {
          droneId: droneId,
          deliveryId: ghostPing.deliveryId,
          currentPoint: {
            latitude: ghostPing.latitude,
            longitude: ghostPing.longitude,
            altitude: ghostPing.altitude,
          },
          destinationPoint: null,
          destinationText: 'UNKNOWN',
          status: AlertStatus.NO_SIGNAL,
          date: new Date(),
        };
        this.kafkaClient.emit('alert', al);
      }
    } else {
      //Reset timeout, otherwise the counter will NEVER decrease
      this.schedulerRegistry.deleteTimeout('drone-' + droneId.toString());
      this.addTimeout(droneId);
    }
  }

  // !! ==> Check if !undefined and if !0
  private isTracked(droneId: number): boolean {
    if (this.ghostCounter[droneId] != undefined) {
      if (this.ghostCounter[droneId] >= 0) return true;
    }
    return false;

    //return !!this.ghostCounter[droneId];
  }

  public setCounterLimit(counterLimit: number) {
    this.GHOST_LIMIT = counterLimit;
  }

  public setTimeout(timeout: number) {
    this.TIMEOUT = timeout;
  }

  public clearAll() {
    for (const t of this.schedulerRegistry.getTimeouts()) {
      this.schedulerRegistry.deleteTimeout(t);
    }
  }
}
