export class ValidationError {
  public message: string;
  public type: string;
  public path?: string;
  public status: number;

  constructor(msg: string, path?: string) {
    this.message = msg;
    this.type = 'ValidationError';
    this.path = path;
    this.status = 400;
  }
}

export class ErrorValidationArray {
  public type: string;
  public errors: any[];
  public status: number;

  constructor(errors: any[]) {
    this.type = 'ErrorValidationArray';
    this.errors = errors;
    this.status = 400;
  }
}

export class ServerError {
  public message: string;
  public type: string;
  public status: number;

  constructor(msg: string) {
    this.message = msg;
    this.type = 'ServerError';
    this.status = 500;
  }
}

export class NotFoundError {
  public message: string;
  public type: string;
  public status: number;

  constructor(msg: string) {
    this.message = msg;
    this.type = 'NotFoundError';
    this.status = 404;
  }
}
