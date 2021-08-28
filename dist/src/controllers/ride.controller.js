"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideController = void 0;
const ride_service_1 = require("../services/ride.service");
class RideController {
    async createRide(req, res, next) {
        try {
            res.body = await ride_service_1.rideService.createRide(req.body);
            return next();
        }
        catch (e) {
            return next(e);
        }
    }
    async getRides(req, res, next) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            res.body = await ride_service_1.rideService.getRides(page, limit);
            res.pagination = await ride_service_1.rideService.getPagination(page, limit);
            res.pagination.inPage = res.body.length;
            return next();
        }
        catch (e) {
            return next(e);
        }
    }
    async getRide(req, res, next) {
        try {
            res.body = await ride_service_1.rideService.getRide(Number(req.params.rideId));
            return next();
        }
        catch (e) {
            return next(e);
        }
    }
}
exports.rideController = new RideController();
//# sourceMappingURL=ride.controller.js.map