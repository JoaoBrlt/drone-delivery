import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Path } from './path.entity';

@Entity()
export class GeoPoint {
  @PrimaryGeneratedColumn()
  public geoPointId: number;

  @ManyToOne(() => Path, (path) => path.coordinates, { onDelete: 'CASCADE' })
  public path: Path;

  /**
   * Position of the point in the path ordering
   */
  @Column()
  public order?: number;

  @Column('float')
  public longitude: number;

  @Column('float')
  public latitude: number;

  @Column('float')
  public altitude: number;
}
