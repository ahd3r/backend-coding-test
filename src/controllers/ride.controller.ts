import * as express from 'express';

import { rideService } from '../services/ride.service';

class RideController {
  public async createRide(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      (res as any).body = await rideService.createRide(req.body);
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
      const page: number = (req.query.page as any) || 1;
      const limit: number = (req.query.limit as any) || 10;
      (res as any).body = await rideService.getRides(page, limit);
      (res as any).pagination = await rideService.getPagination(page, limit);
      (res as any).pagination.inPage = (res as any).body.length;
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
      (res as any).body = await rideService.getRide(Number(req.params.rideId));
      return next();
    } catch (e) {
      return next(e);
    }
  }
}
export const rideController = new RideController();
