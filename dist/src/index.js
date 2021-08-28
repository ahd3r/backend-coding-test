"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const typeorm_1 = require("typeorm");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: 'production.env' });
}
else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: 'development.env' });
}
else if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: 'test.env' });
}
const middleware_1 = require("./utils/middleware");
const ride_router_1 = require("./routers/ride.router");
const rides_1 = require("./models/rides");
let swaggerDocument;
if (process.env.NODE_ENV === 'production') {
    swaggerDocument = JSON.parse(fs.readFileSync(`${process.cwd()}/documentation/swagger-prod.json`).toString());
}
else if (process.env.NODE_ENV === 'development') {
    swaggerDocument = JSON.parse(fs.readFileSync(`${process.cwd()}/documentation/swagger-dev.json`).toString());
}
const createApp = async () => {
    const app = express();
    app.use(cors({ origin: '*' }));
    app.use(helmet());
    app.use(express.json());
    app.use(middleware_1.logReq);
    if (swaggerDocument) {
        const paths = JSON.parse(fs.readFileSync(`${process.cwd()}/documentation/paths.json`).toString());
        const components = JSON.parse(fs.readFileSync(`${process.cwd()}/documentation/components.json`).toString());
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(Object.assign(Object.assign({}, swaggerDocument), { paths, components })));
    }
    app.get('/health', (req, res, next) => {
        res.body = { message: 'API' };
        next();
    });
    app.use('/rides', ride_router_1.router);
    app.use(middleware_1.responseHandler);
    app.use(middleware_1.errorHandler);
    try {
        await (0, typeorm_1.createConnection)({
            type: 'sqlite',
            synchronize: true,
            database: process.env.DB_NAME,
            logging: false,
            entities: [rides_1.RidesEntity]
        });
        return app;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};
exports.createApp = createApp;
if (__filename === ((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename)) {
    (0, exports.createApp)()
        .then((app) => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
        .catch((e) => {
        throw e;
    });
}
//# sourceMappingURL=index.js.map