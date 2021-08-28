import { BaseEntity } from 'typeorm';
export declare class RidesEntity extends BaseEntity {
    id: number;
    startLat: number;
    startLong: number;
    endLat: number;
    endLong: number;
    riderName: string;
    driverName: string;
    driverVehicle: string;
    createdAt: Date;
}
