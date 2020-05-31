import {createSubdirs, parseFile, saveFile} from "./fs-ops";
import { SemVer } from "semver";
import fs, { readFileSync } from 'fs';
import * as lv from "@lv-game-editor/lv-cli"

test("create subdirs",  () =>{
    if (fs.existsSync("/tmp/foo/bar/"))
        fs.rmdirSync("/tmp/foo/bar/", { recursive: true})
    createSubdirs("/tmp/foo/bar/file")
    expect(fs.existsSync("/tmp/foo/bar/")).toBe(true)
})

test("create subdirs when one already exists",  () =>{    
    expect( () => {
        if (fs.existsSync("/tmp/foo/bar/"))
            fs.rmdirSync("/tmp/foo/bar/", { recursive: true})
        createSubdirs("/tmp/foo/bar/file")
        createSubdirs("/tmp/foo/bar/file")
    }).not.toThrowError()
})

test("can save files", () => {

    let encodedData:lv.encoded = {
        declarations: "a",
        on_awake: "b",
        on_enter: "c",
        on_frame: "d",
        on_exit: "e",
        include_directive: null
    }

    saveFile(encodedData, "/tmp/a/b/c/foo.data")
    
    const savedJson = readFileSync("/tmp/a/b/c/foo.data", "utf-8")
    const saved:lv.encoded = JSON.parse(savedJson)
    expect(saved.declarations == encodedData.declarations)
    expect(saved.on_awake == encodedData.on_awake)
    expect(saved.on_enter == encodedData.on_enter)
    expect(saved.on_frame == encodedData.on_frame)
    expect(saved.on_exit == encodedData.on_exit)
})

test("can parse files", () => {
    
    let mock = {
        header:{
            version: "1.2.3"
        },
        body:{
            declarations:{ code: [ "int a;"] },
            on_enter:{ code: [ "int b;" ] },
            on_frame:{ code: [ "int c;" ] },
            on_exit:{ code: [ "int d;" ] }
        }
    }

    const fsResponse = JSON.stringify(mock)
    const originalReadSync = fs.readFileSync
    fs.readFileSync = jest.fn();         
    (fs.readFileSync as jest.Mock).mockReturnValue(fsResponse);

    let data = parseFile('data.json')
    expect(data.header.version == new SemVer("1.2.3")).toBeTruthy()
    fs.readFileSync = originalReadSync
})