import { RidesEntity } from '../models/rides';
import { rideRepository } from '../repositories/ride.repo';
import { ValidationError } from '../utils/errors';

class RideService {
  public async createRide(data: any): Promise<RidesEntity> {
    return rideRepository.create(data);
  }
  public async getRide(id: number): Promise<RidesEntity> {
    const ride: RidesEntity | undefined = await rideRepository.getOne({ id });
    if (!ride) {
      throw new ValidationError('Ride with this id does not exist', 'rideId');
    }
    return ride;
  }
  public async getRides(): Promise<RidesEntity[]> {
    return await rideRepository.getAll();
  }
}

export const rideService = new RideService();
