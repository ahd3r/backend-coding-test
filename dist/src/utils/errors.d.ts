export declare class ValidationError {
    message: string;
    type: string;
    path?: string;
    status: number;
    constructor(msg: string, path?: string);
}
export declare class ErrorValidationArray {
    type: string;
    errors: any[];
    status: number;
    constructor(errors: any[]);
}
export declare class ServerError {
    message: string;
    type: string;
    status: number;
    constructor(msg: string);
}
export declare class NotFoundError {
    message: string;
    type: string;
    status: number;
    constructor(msg: string);
}
