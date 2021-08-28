"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRepository = void 0;
const rides_1 = require("../models/rides");
class RideRepository {
    async create(data) {
        const rideToSave = new rides_1.RidesEntity();
        rideToSave.startLat = data.startLat;
        rideToSave.startLong = data.startLong;
        rideToSave.endLat = data.endLat;
        rideToSave.endLong = data.endLong;
        rideToSave.riderName = data.riderName;
        rideToSave.driverName = data.driverName;
        rideToSave.driverVehicle = data.driverVehicle;
        return await rideToSave.save();
    }
    async getOne(filter) {
        return await rides_1.RidesEntity.findOne({ where: filter });
    }
    async getAll(filter = {}, skip, limit) {
        return await rides_1.RidesEntity.find({ where: filter, skip, take: limit });
    }
    async count(filter = {}) {
        return await rides_1.RidesEntity.count({ where: filter });
    }
}
exports.rideRepository = new RideRepository();
//# sourceMappingURL=ride.repo.js.map