import * as express from 'express';
import { body, param, query } from 'express-validator';

import { rideController } from '../controllers/ride.controller';
import { validateErrors } from '../utils/middleware';

export const router: express.Router = express.Router();

router.post(
  '/',
  [
    body('start_lat')
      .isInt({ max: 90, min: -90 })
      .withMessage('Field start_lat has to be an integer, less than 90 and more than -90'),
    body('start_long')
      .isInt({ max: 180, min: -180 })
      .withMessage('Field start_long has to be an integer, less than 180 and more than -180'),
    body('end_lat')
      .isInt({ max: 90, min: -90 })
      .withMessage('Field end_lat has to be an integer, less than 90 and more than -90'),
    body('end_long')
      .isInt({ max: 180, min: -180 })
      .withMessage('Field end_long has to be an integer, less than 180 and more than -180'),
    body('rider_name')
      .isString()
      .withMessage('Field rider_name has to be a string')
      .isLength({ min: 1 })
      .withMessage('Field rider_name has to be a more than 1 char'),
    body('driver_name')
      .isString()
      .withMessage('Field driver_name has to be a string')
      .isLength({ min: 1 })
      .withMessage('Field driver_name has to be a more than 1 char'),
    body('driver_vehicle')
      .isString()
      .withMessage('Field driver_vehicle has to be a string')
      .isLength({ min: 1 })
      .withMessage('Field driver_vehicle has to be a more than 1 char')
  ],
  validateErrors,
  rideController.createRide
);

router.get(
  '/',
  [
    query('page')
      .isInt({ min: 1 })
      .withMessage('Query page has to be an integer')
      .optional()
      .default(1)
      .toInt(),
    query('limit')
      .isInt({ min: 1 })
      .withMessage('Query page has to be an integer')
      .optional()
      .default(10)
      .toInt()
  ],
  validateErrors,
  rideController.getRides
);

router.get(
  '/:rideId',
  [param('rideId').isInt({ min: 1 }).withMessage('Param rideId has to be an integer').toInt()],
  validateErrors,
  rideController.getRide
);
