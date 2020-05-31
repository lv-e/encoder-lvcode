"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubdirs = void 0;
const path = require("path");
const fs_1 = require("fs");
function createSubdirs(filePath) {
    const dir = path.dirname(filePath);
    if (fs_1.existsSync(dir))
        return true;
    createSubdirs(dir);
    fs_1.mkdirSync(dir);
}
exports.createSubdirs = createSubdirs;
