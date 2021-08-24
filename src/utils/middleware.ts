import * as winston from 'winston';
import * as express from 'express';
import { ErrorValidationArray, NotFoundError, ServerError } from './errors';
import { validationResult } from 'express-validator';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const myHttpFormat = printf(({ timestamp, message }) => {
  const { bodyJson, method, type, path } = JSON.parse(message);
  return `${timestamp} | ${type} ${
    path ? 'path=' + path : ''
  } body="${bodyJson}" method="${method}"`;
});

const loggerHttp = createLogger({
  level: 'info',
  format: combine(timestamp(), myHttpFormat),
  transports: [new transports.Console(), new transports.File({ filename: './log/http.log' })]
});

export const logReq = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let body = { ...req.body };
  if (body.image) {
    body = { ...body, image: 'imageInBase64' };
  }
  loggerHttp.log(
    'info',
    JSON.stringify({
      bodyJson: JSON.stringify(body),
      method: req.method,
      type: 'request',
      path: req.originalUrl
    })
  );
  return next();
};

export const logRes = (resBody: any, method: string) => {
  loggerHttp.log(
    'info',
    JSON.stringify({ bodyJson: JSON.stringify(resBody), method, type: 'response' })
  );
};

export const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let error = err;
  console.error(error);
  if (!error.status) {
    error = new ServerError(error.message);
  }
  const { status, type, message, errors, path } = error;
  const data = JSON.parse(JSON.stringify({ status, type, message, errors, path }));
  res.status(error.status).send(data);
};

export const responseHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!(res as any).body) {
    return next(new NotFoundError('Page not found'));
  }
  logRes((res as any).body, req.method);
  const response: any = { data: (res as any).body };
  res.status(req.method === 'POST' ? 201 : 200).send(response);
};

export const validateErrors: express.RequestHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorValidationArray(errors.array()));
  }
  return next();
};
