#!/usr/bin/env node
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const semver_1 = require("semver");
const fs_ops_1 = require("./fs-ops");
const encoder_1 = require("./encoder");
const testing = (process.env.NODE_ENV === 'test');
const version = new semver_1.SemVer("1.2.0");
const baseline = new semver_1.SemVer("1.0.0");
if (!testing) {
    let cli = meow_1.default("", { flags: {
            input: { type: 'string', alias: 'i' },
            output: { type: 'string', alias: 'o' }
        } });
    let data = fs_ops_1.parseFile(cli.flags.input);
    encoder_1.validateCompatibility(data, version, baseline);
    fs_ops_1.saveFile(encoder_1.encode(data), cli.flags.output);
}
