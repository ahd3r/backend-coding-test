"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateErrors = exports.responseHandler = exports.errorHandler = exports.logRes = exports.logReq = void 0;
const winston = require("winston");
const errors_1 = require("./errors");
const express_validator_1 = require("express-validator");
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;
const myHttpFormat = printf(({ timestamp, message }) => {
    const { bodyJson, method, type, path } = JSON.parse(message);
    return `${timestamp} | ${type} ${path ? 'path=' + path : ''} body="${bodyJson}" method="${method}"`;
});
const loggerHttp = createLogger({
    level: 'info',
    format: combine(timestamp(), myHttpFormat),
    transports: [new transports.Console(), new transports.File({ filename: './log/http.log' })]
});
const logReq = (req, res, next) => {
    let body = Object.assign({}, req.body);
    if (body.image) {
        body = Object.assign(Object.assign({}, body), { image: 'imageInBase64' });
    }
    loggerHttp.log('info', JSON.stringify({
        bodyJson: JSON.stringify(body),
        method: req.method,
        type: 'request',
        path: req.originalUrl
    }));
    return next();
};
exports.logReq = logReq;
const logRes = (resBody, method) => {
    loggerHttp.log('info', JSON.stringify({ bodyJson: JSON.stringify(resBody), method, type: 'response' }));
};
exports.logRes = logRes;
const errorHandler = (err, req, res, next) => {
    let error = err;
    console.error(error);
    if (!error.status) {
        error = new errors_1.ServerError(error.message);
    }
    const { status, type, message, errors, path } = error;
    const data = JSON.parse(JSON.stringify({ status, type, message, errors, path }));
    res.status(error.status).send(data);
};
exports.errorHandler = errorHandler;
const responseHandler = (req, res, next) => {
    if (!res.body) {
        return next(new errors_1.NotFoundError('Page not found'));
    }
    (0, exports.logRes)(res.body, req.method);
    const response = { data: res.body };
    if (res.pagination) {
        response.pagination = res.pagination;
    }
    res.status(req.method === 'POST' ? 201 : 200).send(response);
};
exports.responseHandler = responseHandler;
const validateErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errors_1.ErrorValidationArray(errors.array()));
    }
    return next();
};
exports.validateErrors = validateErrors;
//# sourceMappingURL=middleware.js.map