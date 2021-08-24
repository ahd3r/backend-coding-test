import { RidesEntity } from '../models/rides';
import { rideRepository } from '../repositories/ride.repo';
import { ValidationError } from '../utils/errors';
import { Pagination } from '../utils/interfaces/pagination';

class RideService {
  public async createRide(data: any): Promise<RidesEntity> {
    data.startLat = data.start_lat;
    data.startLong = data.start_long;
    data.endLat = data.end_lat;
    data.endLong = data.end_long;
    data.riderName = data.rider_name;
    data.driverName = data.driver_name;
    data.driverVehicle = data.driver_vehicle;
    return await rideRepository.create(data);
  }
  public async getRide(id: number): Promise<RidesEntity> {
    const ride: RidesEntity | undefined = await rideRepository.getOne({ id });
    if (!ride) {
      throw new ValidationError('Ride with this id does not exist', 'rideId');
    }
    return ride;
  }
  public async getRides(page: number, limit: number): Promise<RidesEntity[]> {
    return await rideRepository.getAll({}, (page - 1) * limit, limit);
  }
  public async getPagination(page: number, limit: number): Promise<Partial<Pagination>> {
    const total: number = await rideRepository.count();
    const skip: number = (page - 1) * limit;
    return { total, skip, limit };
  }
}

export const rideService = new RideService();
