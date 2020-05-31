import { LVCodeFile } from "./types";
import { encoded } from "@lv-game-editor/lv-cli";
export declare function createSubdirs(filePath: string): true | undefined;
export declare function parseFile(path: string): LVCodeFile;
export declare function saveFile(data: encoded, path: string): void;
