import { Injectable } from '@nestjs/common';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

@Injectable()
export class CacheService {
  /**
   * Count the number of entry since the last reset
   */
  private entriesCount = 0;

  /**
   * Map registering all last ping for a drone
   *  ping => droneId
   * @private
   */
  private lastPing: { [p: number]: DroneHeartbeatDto } = {};

  /**
   * Record a new data (a ping)
   * If the deliveryPing already send a ping, the previous one will be replaced by the new one
   * @param data
   */
  public recordNewEntry(data: DroneHeartbeatDto): void {
    this.lastPing[data.droneId] = data;
    this.entriesCount++;
  }

  /**
   * get all last pings (one by drone)
   */
  public getLastPing(): DroneHeartbeatDto[] {
    return Object.values(this.lastPing);
  }

  /**
   * get the number of entry since the last reset
   */
  public getNewEntriesCount(): number {
    return this.entriesCount;
  }

  /**
   * reset the counter of entry.
   */
  public resetCount(): void {
    this.entriesCount = 0;
  }
}
