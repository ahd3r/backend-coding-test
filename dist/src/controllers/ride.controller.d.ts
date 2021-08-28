import * as express from 'express';
declare class RideController {
    createRide(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
    getRides(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
    getRide(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
}
export declare const rideController: RideController;
export {};
