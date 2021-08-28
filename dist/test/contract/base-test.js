"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequest = exports.getRequest = void 0;
const request = require("supertest");
const index_1 = require("../../src/index");
class TestApp {
    static async getApp() {
        if (!this.app) {
            this.app = await (0, index_1.createApp)();
        }
        return this.app;
    }
}
const getRequest = async (url) => {
    return await request(await TestApp.getApp()).get(url);
};
exports.getRequest = getRequest;
const postRequest = async (url, data) => {
    return await request(await TestApp.getApp())
        .post(url)
        .send(data);
};
exports.postRequest = postRequest;
//# sourceMappingURL=base-test.js.map