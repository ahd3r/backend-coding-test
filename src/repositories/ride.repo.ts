import { FindConditions } from 'typeorm';
import { RidesEntity } from '../models/rides';

class RideRepository {
  public async create(data: any): Promise<RidesEntity> {
    const rideToSave = new RidesEntity();
    rideToSave.startLat = data.start_lat;
    rideToSave.startLong = data.start_long;
    rideToSave.endLat = data.end_lat;
    rideToSave.endLong = data.end_long;
    rideToSave.riderName = data.rider_name;
    rideToSave.driverName = data.driver_name;
    rideToSave.driverVehicle = data.driver_vehicle;
    return await rideToSave.save();
  }

  public async getOne(filter: FindConditions<RidesEntity>): Promise<RidesEntity | undefined> {
    return await RidesEntity.findOne({ where: filter });
  }

  public async getAll(filter: FindConditions<RidesEntity> = {}): Promise<RidesEntity[]> {
    return await RidesEntity.find({ where: filter });
  }
}

export const rideRepository = new RideRepository();
