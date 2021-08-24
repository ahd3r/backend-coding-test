import * as request from 'supertest';

import { app } from '../../src';

export const getRequest = async (url: string): Promise<request.Response> => {
  return request(app).get(url);
};

export const postRequest = async (url: string): Promise<request.Response> => {
  return request(app).post(url);
};
