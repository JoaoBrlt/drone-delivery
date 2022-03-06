import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Delivery {
  /**
   * The delivery id.
   */
  @PrimaryColumn()
  public deliveryId: string;

  /**
   * The drone identifier.
   */
  @Column()
  public droneId: number;

  /**
   * The destination.
   */
  @Column()
  public destination: string;

  /**
   * The delivery status.
   */
  @Column()
  public status: DeliveryStatus;

  /**
   * The delivery date.
   */
  @Column()
  public date: Date;
}

export enum DeliveryStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
