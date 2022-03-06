import { DroneStatus } from './drone-status.dto';

export class DroneHeartbeatDto {
  /**
   * The drone identifier.
   */
  public droneId: number;

  /**
   * The delivery identifier.
   */
  public deliveryId: string;

  /**
   * Whether the delivery is critical.
   */
  public isCritical: boolean;

  /**
   * The drone status.
   */
  public status: DroneStatus;

  /**
   * The latitude of the drone.
   */
  public latitude: number;

  /**
   * The longitude of the drone.
   */
  public longitude: number;

  /**
   * The altitude of the drone.
   */
  public altitude: number;

  /**
   * The date of the heartbeat.
   */
  public date: Date;
}
