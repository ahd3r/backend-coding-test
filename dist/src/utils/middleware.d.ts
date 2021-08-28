import * as express from 'express';
export declare const logReq: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare const logRes: (resBody: any, method: string) => void;
export declare const errorHandler: (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare const responseHandler: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare const validateErrors: express.RequestHandler;
