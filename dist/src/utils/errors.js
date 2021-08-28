"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ServerError = exports.ErrorValidationArray = exports.ValidationError = void 0;
class ValidationError {
    constructor(msg, path) {
        this.message = msg;
        this.type = 'ValidationError';
        this.path = path;
        this.status = 400;
    }
}
exports.ValidationError = ValidationError;
class ErrorValidationArray {
    constructor(errors) {
        this.type = 'ErrorValidationArray';
        this.errors = errors;
        this.status = 400;
    }
}
exports.ErrorValidationArray = ErrorValidationArray;
class ServerError {
    constructor(msg) {
        this.message = msg;
        this.type = 'ServerError';
        this.status = 500;
    }
}
exports.ServerError = ServerError;
class NotFoundError {
    constructor(msg) {
        this.message = msg;
        this.type = 'NotFoundError';
        this.status = 404;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=errors.js.map