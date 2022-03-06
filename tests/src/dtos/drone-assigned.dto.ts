export class DroneAssignedDto {
  /**
   * The drone identifier.
   */
  public droneId: number;

  /**
   * The delivery identifier.
   */
  public deliveryId: string;

  /**
   * The destination address.
   */
  public destination: string;

  /**
   * The departure date of the drone.
   */
  public date: Date;
}
