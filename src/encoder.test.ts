import { LVCodeFile } from "./types"
import { validateCompatibility, encode } from "./encoder"
import { SemVer } from "semver"

test("version compatibility check", () =>{
    
    let mock = JSON.stringify({
        header:{
            version: "1.2.3"
        },
        body:{
            declarations:{ code: [ "int a;"] },
            on_enter:{ code: [ "int b;" ] },
            on_frame:{ code: [ "int c;" ] },
            on_exit:{ code: [ "int d;" ] }
        }
    })

    let data:LVCodeFile = JSON.parse(mock)

    expect( () => {
        validateCompatibility(data, new SemVer("2.1.0"), new SemVer("2.0.0"))
    }).toThrow(Error)

    expect( () => {
        validateCompatibility(data, new SemVer("0.1.0"), new SemVer("0.0.0"))
    }).toThrow(Error)

    expect( () => {
        validateCompatibility(data, new SemVer("1.3.4"), new SemVer("1.0.0"))
    }).not.toThrowError()

})

test("encode function", () =>{
   
    let mock = JSON.stringify({
        header:{
            version: "1.2.3"
        },
        body:{
            declarations:{ code: [ "int a;"] },
            on_enter:{ code: [ "int b;" ] },
            on_frame:{ code: [ "int c;", "int d;" ] },
            on_exit:{ code: [ ] }
        }
    })

    let data:LVCodeFile = JSON.parse(mock)
    let encoded = encode(data)

    expect(encoded.on_enter).toBe("int b;")
    expect(encoded.on_frame).toBe("int c;\nint d;")
    expect(encoded.on_exit).toBe("")
})