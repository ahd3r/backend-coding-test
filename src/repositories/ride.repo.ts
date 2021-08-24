import { FindConditions } from 'typeorm';
import { RidesEntity } from '../models/rides';

class RideRepository {
  public async create(data: any): Promise<RidesEntity> {
    const rideToSave = new RidesEntity();
    rideToSave.startLat = data.startLat;
    rideToSave.startLong = data.startLong;
    rideToSave.endLat = data.endLat;
    rideToSave.endLong = data.endLong;
    rideToSave.riderName = data.riderName;
    rideToSave.driverName = data.driverName;
    rideToSave.driverVehicle = data.driverVehicle;
    return await rideToSave.save();
  }

  public async getOne(filter: FindConditions<RidesEntity>): Promise<RidesEntity | undefined> {
    return await RidesEntity.findOne({ where: filter });
  }

  public async getAll(
    filter: FindConditions<RidesEntity> = {},
    skip: number,
    limit: number
  ): Promise<RidesEntity[]> {
    return await RidesEntity.find({ where: filter, skip, take: limit });
  }

  public async count(filter: FindConditions<RidesEntity> = {}): Promise<number> {
    return await RidesEntity.count({ where: filter });
  }
}

export const rideRepository = new RideRepository();
