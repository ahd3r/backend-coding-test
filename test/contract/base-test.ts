import * as express from 'express';
import * as request from 'supertest';

import { createApp } from '../../src/index';

class TestApp {
  private static app: express.Express;

  public static async getApp(): Promise<express.Express> {
    if (!this.app) {
      this.app = await createApp();
    }
    return this.app;
  }
}

export const getRequest = async (url: string): Promise<request.Response> => {
  return await request(await TestApp.getApp()).get(url);
};

export const postRequest = async (url: string, data: any): Promise<request.Response> => {
  return await request(await TestApp.getApp())
    .post(url)
    .send(data);
};
