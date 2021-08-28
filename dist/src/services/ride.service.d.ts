import { RidesEntity } from '../models/rides';
import { Pagination } from '../utils/interfaces/pagination';
declare class RideService {
    createRide(data: any): Promise<RidesEntity>;
    getRide(id: number): Promise<RidesEntity>;
    getRides(page: number, limit: number): Promise<RidesEntity[]>;
    getPagination(page: number, limit: number): Promise<Partial<Pagination>>;
}
export declare const rideService: RideService;
export {};
