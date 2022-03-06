import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DroneStatus } from '../types/drone-status.type';

@Entity()
export class DroneHeartbeat {
  /**
   * The log's identifier.
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * The drone identifier.
   */
  @Column()
  public droneId: number;

  /**
   * The delivery identifier
   */
  @Column()
  public deliveryId: string;

  /**
   * Whether the delivery is critical.
   */
  @Column()
  public isCritical: boolean;

  /**
   * The drone status.
   */
  @Column()
  public status: DroneStatus;

  /**
   * The latitude of the drone.
   */
  @Column('float')
  public latitude: number;

  /**
   * The longitude of the drone.
   */
  @Column('float')
  public longitude: number;

  /**
   * The altitude of the drone.
   */
  @Column('float')
  public altitude: number;

  /**
   * The date of the heartbeat.
   */
  @Column()
  public date: Date;
}
