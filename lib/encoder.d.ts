import { LVCodeFile } from "./types";
import { SemVer } from "semver";
import * as lv from "@lv-game-editor/lv-cli";
export declare function validateCompatibility(data: LVCodeFile, version: SemVer, baseline: SemVer): void;
export declare function encode(data: LVCodeFile): lv.encoded;
