"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.parseFile = exports.createSubdirs = void 0;
const path = require("path");
const fs_1 = __importDefault(require("fs"));
function createSubdirs(filePath) {
    const dir = path.dirname(filePath);
    if (fs_1.default.existsSync(dir))
        return true;
    createSubdirs(dir);
    fs_1.default.mkdirSync(dir);
}
exports.createSubdirs = createSubdirs;
function parseFile(path) {
    const jsonString = fs_1.default.readFileSync(path, "utf8");
    const data = JSON.parse(jsonString);
    return data;
}
exports.parseFile = parseFile;
function saveFile(data, path) {
    let jsonString = JSON.stringify(data, null, " ") + "\n";
    createSubdirs(path);
    fs_1.default.writeFileSync(path, jsonString);
}
exports.saveFile = saveFile;
