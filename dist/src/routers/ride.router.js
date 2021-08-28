"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const express_validator_1 = require("express-validator");
const ride_controller_1 = require("../controllers/ride.controller");
const middleware_1 = require("../utils/middleware");
exports.router = express.Router();
exports.router.post('/', [
    (0, express_validator_1.body)('start_lat')
        .isInt({ max: 90, min: -90 })
        .withMessage('Field start_lat has to be an integer, less than 90 and more than -90'),
    (0, express_validator_1.body)('start_long')
        .isInt({ max: 180, min: -180 })
        .withMessage('Field start_long has to be an integer, less than 180 and more than -180'),
    (0, express_validator_1.body)('end_lat')
        .isInt({ max: 90, min: -90 })
        .withMessage('Field end_lat has to be an integer, less than 90 and more than -90'),
    (0, express_validator_1.body)('end_long')
        .isInt({ max: 180, min: -180 })
        .withMessage('Field end_long has to be an integer, less than 180 and more than -180'),
    (0, express_validator_1.body)('rider_name')
        .isString()
        .withMessage('Field rider_name has to be a string')
        .isLength({ min: 1 })
        .withMessage('Field rider_name has to be a more than 1 char'),
    (0, express_validator_1.body)('driver_name')
        .isString()
        .withMessage('Field driver_name has to be a string')
        .isLength({ min: 1 })
        .withMessage('Field driver_name has to be a more than 1 char'),
    (0, express_validator_1.body)('driver_vehicle')
        .isString()
        .withMessage('Field driver_vehicle has to be a string')
        .isLength({ min: 1 })
        .withMessage('Field driver_vehicle has to be a more than 1 char')
], middleware_1.validateErrors, ride_controller_1.rideController.createRide);
exports.router.get('/', [
    (0, express_validator_1.query)('page')
        .isInt({ min: 1 })
        .withMessage('Query page has to be an integer')
        .toInt()
        .default(1),
    (0, express_validator_1.query)('limit')
        .isInt({ min: 1 })
        .withMessage('Query limit has to be an integer')
        .toInt()
        .default(10)
], ride_controller_1.rideController.getRides);
exports.router.get('/:rideId', [(0, express_validator_1.param)('rideId').isInt({ min: 1 }).withMessage('Param rideId has to be an integer').toInt()], middleware_1.validateErrors, ride_controller_1.rideController.getRide);
//# sourceMappingURL=ride.router.js.map