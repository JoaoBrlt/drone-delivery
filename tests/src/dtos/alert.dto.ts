import { GeoPoint } from '../types/geo-point.type';
import { AlertStatus } from './alert-status.dto';

export class AlertDto {
  /**
   * The drone identifier.
   */
  public droneId: number;

  /**
   * The delivery identifier.
   */
  public deliveryId: string;

  /**
   * The current point (location) of the drone when the alert is sent
   */
  public currentPoint: GeoPoint;

  /**
   * The destination text (the string) of the drone.
   */
  public destinationText: string;

  /**
   * The destination point (the GeoPoint) of the drone.
   */
  public destinationPoint: GeoPoint;

  /**
   * The alert status -> Enum
   */
  public status: AlertStatus;

  /**
   * The timestamp of the alert (can only be equal to now() when used with the normal route as the drone)
   *  -> Kept as a parameter here for code simplicity (entry point == exit point) + DEBUGGING if needed
   */
  public date: Date;
}
