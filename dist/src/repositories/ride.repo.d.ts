import { FindConditions } from 'typeorm';
import { RidesEntity } from '../models/rides';
declare class RideRepository {
    create(data: any): Promise<RidesEntity>;
    getOne(filter: FindConditions<RidesEntity>): Promise<RidesEntity | undefined>;
    getAll(filter: FindConditions<RidesEntity> | undefined, skip: number, limit: number): Promise<RidesEntity[]>;
    count(filter?: FindConditions<RidesEntity>): Promise<number>;
}
export declare const rideRepository: RideRepository;
export {};
