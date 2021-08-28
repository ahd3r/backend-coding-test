"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
fs.copySync(path.join(__dirname, '..', '..', 'documentation'), path.join(__dirname, '..', '..', 'dist', 'documentation'));
//# sourceMappingURL=copy-documentation.js.map