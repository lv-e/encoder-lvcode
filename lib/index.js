#!/usr/bin/env node
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const semver_1 = __importStar(require("semver"));
const fs_1 = require("fs");
const assert_1 = require("assert");
const helpers_1 = require("./helpers");
const version = new semver_1.SemVer("1.2.0");
const baseline = new semver_1.SemVer("1.0.0");
let cli = meow_1.default("", { flags: {
        input: { type: 'string', alias: 'i' },
        output: { type: 'string', alias: 'o' }
    } });
// STEP: parse file, validating format
const jsonString = fs_1.readFileSync(cli.flags.input, "utf8");
const data = JSON.parse(jsonString);
// STEP: check header version
if (semver_1.default.gt(data.header.version, version)) {
    assert_1.fail("file version (" + data.header.version + ")"
        + " is newer than this tool (need an updated editor version?)");
}
if (semver_1.default.lt(data.header.version, baseline)) {
    assert_1.fail("file version (" + data.header.version + ")"
        + " is now deprecated (maybe use an older editor version?)");
}
// STEP: generate output based on flavor
let encode = {
    declarations: ((_a = data.body.declarations) === null || _a === void 0 ? void 0 : _a.code.join("\n")) || "",
    on_awake: ((_b = data.body.on_awake) === null || _b === void 0 ? void 0 : _b.code.join("\n")) || "",
    on_enter: ((_c = data.body.on_enter) === null || _c === void 0 ? void 0 : _c.code.join("\n")) || "",
    on_frame: ((_d = data.body.on_frame) === null || _d === void 0 ? void 0 : _d.code.join("\n")) || "",
    on_exit: ((_e = data.body.on_exit) === null || _e === void 0 ? void 0 : _e.code.join("\n")) || "",
    include_directive: null
};
// STEP: write response to file
let response = JSON.stringify(encode, null, " ") + "\n";
helpers_1.createSubdirs(cli.flags.output);
fs_1.writeFileSync(cli.flags.output, response);
