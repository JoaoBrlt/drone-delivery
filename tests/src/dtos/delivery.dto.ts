export class DeliveryDto {
  /**
   * The drone id
   */
  public droneId: number;

  /**
   * The delivery id
   */
  public deliveryId: string;

  /**
   * The destination address.
   */
  public destination: string;

  /**
   * The path to follow
   */
  public path: GeoPointDto[];

  /**
   * The departure date
   */
  public date: Date;
}

export class GeoPointDto {
  public order?: number;
  public longitude: number;
  public latitude: number;
  public altitude: number;
}
