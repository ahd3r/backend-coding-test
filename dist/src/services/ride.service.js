"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideService = void 0;
const ride_repo_1 = require("../repositories/ride.repo");
const errors_1 = require("../utils/errors");
class RideService {
    async createRide(data) {
        data.startLat = data.start_lat;
        data.startLong = data.start_long;
        data.endLat = data.end_lat;
        data.endLong = data.end_long;
        data.riderName = data.rider_name;
        data.driverName = data.driver_name;
        data.driverVehicle = data.driver_vehicle;
        return await ride_repo_1.rideRepository.create(data);
    }
    async getRide(id) {
        const ride = await ride_repo_1.rideRepository.getOne({ id });
        if (!ride) {
            throw new errors_1.ValidationError('Ride with this id does not exist', 'rideId');
        }
        return ride;
    }
    async getRides(page, limit) {
        return await ride_repo_1.rideRepository.getAll({}, (page - 1) * limit, limit);
    }
    async getPagination(page, limit) {
        const total = await ride_repo_1.rideRepository.count();
        const skip = (page - 1) * limit;
        return { total, skip, limit };
    }
}
exports.rideService = new RideService();
//# sourceMappingURL=ride.service.js.map