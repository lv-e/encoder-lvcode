#!/usr/bin/env node
'use strict'

import meow from "meow";
import { SemVer } from "semver";
import { parseFile, saveFile } from "./fs-ops";
import { validateCompatibility, encode } from "./encoder";

const testing   = (process.env.NODE_ENV === 'test')
const version   = new SemVer("1.2.0")
const baseline  = new SemVer("1.0.0")

if (!testing) {

    let cli = meow("",{ flags: {
        input:  { type: 'string', alias: 'i'},
        output: { type: 'string', alias: 'o'}
    }})
    
    let data = parseFile(cli.flags.input)
    validateCompatibility(data, version, baseline)
    saveFile(encode(data), cli.flags.output)
}
