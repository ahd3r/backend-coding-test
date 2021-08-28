import * as request from 'supertest';
export declare const getRequest: (url: string) => Promise<request.Response>;
export declare const postRequest: (url: string, data: any) => Promise<request.Response>;
