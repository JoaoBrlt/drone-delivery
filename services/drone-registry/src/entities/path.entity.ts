import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { GeoPoint } from './geopoint.entity';

@Entity()
export class Path {
  /**
   * The delivery id.
   */
  @PrimaryColumn()
  public droneId: number;

  /**
   * The geographic path's point
   */
  @OneToMany(() => GeoPoint, (point) => point.path, { cascade: true })
  public coordinates: GeoPoint[];
}
