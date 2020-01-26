#!/usr/bin/env node
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
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
    declarations: data.body.declarations.code,
    on_enter: data.body.on_enter.code,
    on_frame: data.body.on_frame.code,
    on_exit: data.body.on_exit.code,
    rom_data: ""
};
// STEP: write response to file
let response = JSON.stringify(encode, null, " ") + "\n";
helpers_1.createSubdirs(cli.flags.output);
fs_1.writeFileSync(cli.flags.output, response);
