"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rides_1 = require("../../src/models/rides");
const base_test_1 = require("./base-test");
describe('testing rides endpoints', () => {
    it('checks rides in db', async () => {
        const res = await (0, base_test_1.getRequest)('/rides');
        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBe(2);
        expect(Object.keys(res.body)).toContain('data');
        expect(Object.keys(res.body)).toContain('pagination');
        expect(res.body.data).toEqual([]);
        expect(res.body.pagination).toHaveProperty('inPage', 0);
        expect(res.body.pagination).toHaveProperty('total', 0);
        expect(res.body.pagination).toHaveProperty('skip', 0);
        expect(res.body.pagination).toHaveProperty('limit', 10);
    });
    it('checks mistake in router', async () => {
        const res = await (0, base_test_1.getRequest)('/ridess');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Page not found');
        expect(res.body).toHaveProperty('status', 404);
        expect(res.body).toHaveProperty('type', 'NotFoundError');
    });
    it('correct create ride', async () => {
        const correctDataToCreateRide = {
            start_lat: 1,
            start_long: 1,
            end_lat: 1,
            end_long: 1,
            rider_name: 'a',
            driver_name: 'a',
            driver_vehicle: 'a'
        };
        const res = await (0, base_test_1.postRequest)('/rides', correctDataToCreateRide);
        expect(res.status).toBe(201);
        expect(Object.keys(res.body).length).toBe(1);
        expect(Object.keys(res.body)).toContain('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('startLat', correctDataToCreateRide.start_lat);
        expect(res.body.data).toHaveProperty('startLong', correctDataToCreateRide.start_long);
        expect(res.body.data).toHaveProperty('endLat', correctDataToCreateRide.end_lat);
        expect(res.body.data).toHaveProperty('endLong', correctDataToCreateRide.end_long);
        expect(res.body.data).toHaveProperty('riderName', correctDataToCreateRide.rider_name);
        expect(res.body.data).toHaveProperty('driverName', correctDataToCreateRide.driver_name);
        expect(res.body.data).toHaveProperty('driverVehicle', correctDataToCreateRide.driver_vehicle);
        expect(res.body.data).toHaveProperty('createdAt');
    });
    it('incorrect create ride', async () => {
        const res1 = await (0, base_test_1.postRequest)('/rides', {});
        expect(res1.status).toBe(400);
        expect(res1.body).toHaveProperty('errors');
        expect(res1.body.errors.length).toBe(10);
        const res2 = await (0, base_test_1.postRequest)('/rides', { start_lat: 1 });
        expect(res2.status).toBe(400);
        expect(res2.body).toHaveProperty('errors');
        expect(res2.body.errors.length).toBe(9);
    });
    it('get all rides with pagination', async () => {
        const res = await (0, base_test_1.getRequest)('/rides');
        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBe(2);
        expect(Object.keys(res.body)).toContain('data');
        expect(Object.keys(res.body)).toContain('pagination');
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0]).toHaveProperty('id');
        expect(res.body.data[0]).toHaveProperty('startLat', 1);
        expect(res.body.data[0]).toHaveProperty('startLong', 1);
        expect(res.body.data[0]).toHaveProperty('endLat', 1);
        expect(res.body.data[0]).toHaveProperty('endLong', 1);
        expect(res.body.data[0]).toHaveProperty('riderName', 'a');
        expect(res.body.data[0]).toHaveProperty('driverName', 'a');
        expect(res.body.data[0]).toHaveProperty('driverVehicle', 'a');
        expect(res.body.data[0]).toHaveProperty('createdAt');
        expect(res.body.pagination).toHaveProperty('inPage', 1);
        expect(res.body.pagination).toHaveProperty('total', 1);
        expect(res.body.pagination).toHaveProperty('skip', 0);
        expect(res.body.pagination).toHaveProperty('limit', 10);
    });
    it('get ride by id', async () => {
        const { body: { data: allRides } } = await (0, base_test_1.getRequest)('/rides');
        const res = await (0, base_test_1.getRequest)(`/rides/${allRides[0].id}`);
        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBe(1);
        expect(Object.keys(res.body)).toContain('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('startLat', 1);
        expect(res.body.data).toHaveProperty('startLong', 1);
        expect(res.body.data).toHaveProperty('endLat', 1);
        expect(res.body.data).toHaveProperty('endLong', 1);
        expect(res.body.data).toHaveProperty('riderName', 'a');
        expect(res.body.data).toHaveProperty('driverName', 'a');
        expect(res.body.data).toHaveProperty('driverVehicle', 'a');
        expect(res.body.data).toHaveProperty('createdAt');
    });
    it('get ride by wrong id', async () => {
        const res = await (0, base_test_1.getRequest)('/rides/9999');
        expect(res.status).toBe(400);
    });
    it('check pagination', async () => {
        const correctDataToCreateRide = {
            start_lat: 2,
            start_long: 2,
            end_lat: 2,
            end_long: 2,
            rider_name: 'aa',
            driver_name: 'aa',
            driver_vehicle: 'aa'
        };
        for (let i = 0; i < 15; i++) {
            await (0, base_test_1.postRequest)('/rides', correctDataToCreateRide);
        }
        const res1 = await (0, base_test_1.getRequest)('/rides');
        expect(res1.body).toHaveProperty('pagination');
        expect(res1.body.pagination).toHaveProperty('inPage', 10);
        expect(res1.body.pagination).toHaveProperty('total', 16);
        expect(res1.body.pagination).toHaveProperty('skip', 0);
        expect(res1.body.pagination).toHaveProperty('limit', 10);
        const res2 = await (0, base_test_1.getRequest)('/rides?page=2&limit=16');
        expect(res2.body).toHaveProperty('pagination');
        expect(res2.body.pagination).toHaveProperty('inPage', 0);
        expect(res2.body.pagination).toHaveProperty('total', 16);
        expect(res2.body.pagination).toHaveProperty('skip', 16);
        expect(res2.body.pagination).toHaveProperty('limit', 16);
        const res3 = await (0, base_test_1.getRequest)('/rides?page=2');
        expect(res3.body).toHaveProperty('pagination');
        expect(res3.body.pagination).toHaveProperty('inPage', 6);
        expect(res3.body.pagination).toHaveProperty('total', 16);
        expect(res3.body.pagination).toHaveProperty('skip', 10);
        expect(res3.body.pagination).toHaveProperty('limit', 10);
    });
    afterAll(async () => {
        await rides_1.RidesEntity.delete({});
    });
});
//# sourceMappingURL=rides.test.js.map