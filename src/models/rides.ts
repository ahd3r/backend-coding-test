import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'Rides' })
export class RidesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'decimal', name: 'rideID' })
  public id: number;

  @Column({ type: 'decimal', name: 'startLat' })
  public startLat: number;

  @Column({ type: 'decimal', name: 'startLong' })
  public startLong: number;

  @Column({ type: 'decimal', name: 'endLat' })
  public endLat: number;

  @Column({ type: 'decimal', name: 'endLong' })
  public endLong: number;

  @Column({ type: 'text', name: 'riderName' })
  public riderName: string;

  @Column({ type: 'text', name: 'driverName' })
  public driverName: string;

  @Column({ type: 'text', name: 'driverVehicle' })
  public driverVehicle: string;

  @Column({ type: 'date', default: new Date(), name: 'created' })
  public createdAt: Date;
}
