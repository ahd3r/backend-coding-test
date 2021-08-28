"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_test_1 = require("./base-test");
describe('init tests', () => {
    it('check health of the app', async () => {
        const res = await (0, base_test_1.getRequest)('/health');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('message', 'API');
    });
});
//# sourceMappingURL=health-check.test.js.map