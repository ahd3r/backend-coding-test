import * as request from 'supertest';
import * as assert from 'assert';

import { getRequest } from './base-test';

describe('init tests', () => {
  it('check health of the app', async () => {
    const res: request.Response = await getRequest('/health');

    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { message: 'API' });
  });
});
