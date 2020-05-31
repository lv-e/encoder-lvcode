import { LVCodeFile, CodeStrip } from "./types"
import { SemVer, gt, lt } from "semver"
import * as lv from "@lv-game-editor/lv-cli"

export function validateCompatibility(data:LVCodeFile, version:SemVer, baseline:SemVer) {

    if (gt(data.header.version, version)) {
        throw new Error("file version (" + data.header.version + ")"
        + " is newer than this tool (need an updated encoder version?)")
    }
    
    if (lt(data.header.version, baseline)) {
        throw new Error("file version (" + data.header.version + ")"
        + " is now deprecated (maybe use an older encoder version?)")
    }
}

export function encode(data:LVCodeFile) : lv.encoded {

    function asString(strip:CodeStrip | null) : string {
        return strip?.code.join("\n") || ""
    }

    let encodedData:lv.encoded = {
        declarations:   asString(data.body.declarations),
        on_awake:       asString(data.body.on_awake),
        on_enter:       asString(data.body.on_enter),
        on_frame:       asString(data.body.on_frame),
        on_exit:        asString(data.body.on_exit),
        include_directive: null
    }

    return encodedData
} 