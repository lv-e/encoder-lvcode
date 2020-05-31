"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.validateCompatibility = void 0;
const semver_1 = require("semver");
function validateCompatibility(data, version, baseline) {
    if (semver_1.gt(data.header.version, version)) {
        throw new Error("file version (" + data.header.version + ")"
            + " is newer than this tool (need an updated encoder version?)");
    }
    if (semver_1.lt(data.header.version, baseline)) {
        throw new Error("file version (" + data.header.version + ")"
            + " is now deprecated (maybe use an older encoder version?)");
    }
}
exports.validateCompatibility = validateCompatibility;
function encode(data) {
    function asString(strip) {
        return (strip === null || strip === void 0 ? void 0 : strip.code.join("\n")) || "";
    }
    let encodedData = {
        declarations: asString(data.body.declarations),
        on_awake: asString(data.body.on_awake),
        on_enter: asString(data.body.on_enter),
        on_frame: asString(data.body.on_frame),
        on_exit: asString(data.body.on_exit),
        include_directive: null
    };
    return encodedData;
}
exports.encode = encode;
