import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WeatherStatus } from '../types/weather-status';

@Entity()
export class Weather {
  /**
   * The weather id.
   */
  @PrimaryGeneratedColumn()
  public weatherId: string;

  /**
   * The weather status.
   */
  @Column()
  public status: WeatherStatus;

  //The weather is located in a specific zone, approximated by a center-point and a radius
  /**
   * The latitude of the center-point.
   */
  @Column('float')
  public latitude: number;
  /**
   * The longitude of the center-point.
   */
  @Column('float')
  public longitude: number;
  /**
   * The radius of the zone.
   */
  @Column('float')
  public radius: number;

  /**
   * The bad weather event start datetime.
   */
  @Column()
  public dateStart: Date;

  /**
   * The bad weather event end datetime.
   */
  @Column()
  public dateEnd: Date;
}
