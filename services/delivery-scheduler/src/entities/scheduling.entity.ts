import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Scheduling {
  /**
   * The assignment identifier.
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * The drone identifier.
   */
  @Column()
  public droneId: number;

  /**
   * The delivery identifier.
   */
  @Column()
  public deliveryId: string;

  /**
   * The departure date of the drone.
   */
  @Column()
  public date: Date;

  /**
   * The destination address of the drone.
   */
  @Column()
  public destination: string;
}
