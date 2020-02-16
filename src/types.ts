import { SemVer } from "semver";

export interface Header {
    content_type:"lvcode"
    flavor:("scene"|"support")
    version:SemVer
}

export interface CodeStrip {
    code:string
}

export interface Body {
    declarations:CodeStrip | null
    on_awake:CodeStrip | null
    on_enter:CodeStrip | null
    on_frame:CodeStrip | null
    on_exit:CodeStrip  | null
    globals:CodeStrip  | null
}

export interface LVCodeFile {
    header:Header
    body:Body
}