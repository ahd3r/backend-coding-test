import express from 'express';

import { rideService } from '../services/ride.service';

class RideController {
  public async createRide(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      (res as any).body = rideService.createRide(req.body);
      return next();
    } catch (e) {
      return next(e);
    }
  }

  public async getRides(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      (res as any).body = rideService.getRides();
      return next();
    } catch (e) {
      return next(e);
    }
  }

  public async getRide(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      (res as any).body = rideService.getRide(Number(req.params.rideId));
      return next();
    } catch (e) {
      return next(e);
    }
  }
}
export const rideController = new RideController();
