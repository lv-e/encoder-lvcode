import path = require("path");
import fs from 'fs';
import { LVCodeFile } from "./types";
import { encoded } from "@lv-game-editor/lv-cli";

export function createSubdirs(filePath:string) {
    const dir = path.dirname(filePath);
    if (fs.existsSync(dir)) return true;
    createSubdirs(dir);
    fs.mkdirSync(dir);
}

export function parseFile(path:string) : LVCodeFile {
    const jsonString = fs.readFileSync(path, "utf8")
    const data:LVCodeFile = JSON.parse(jsonString)
    return data
}

export function saveFile(data:encoded, path:string) {
    let jsonString = JSON.stringify(data, null, " ") + "\n"
    createSubdirs(path)
    fs.writeFileSync(path, jsonString)
}