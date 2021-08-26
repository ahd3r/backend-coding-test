import * as request from 'supertest';

import { getRequest } from './base-test';

describe('init tests', () => {
  it('check health of the app', async () => {
    const res: request.Response = await getRequest('/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('message', 'API');
  });
});
