
const st = `
import React, { useState } from "react"


const Hello = ()=><h1>Hello World</h1>

//<xyntax path="./test-result.js" example1>
{
    const Hello = ()=><h1> <x-text>I'm a button</x-text></h1>
    const hello = 'Hello Worlds'.match(new RegExp('Hello Worlds'))[0]
    // code here... \`
    function MyButton() {
        const onClickHandle = ()=>{}
        return (
            //<x-jsx>
            <div>
                <Hello/>
                <button onClick = {onClickHandle}>
                    <x-text>I'm a button</x-text>
                </button>
            </div>
            //</x-jsx>
        );
    }
}
//</xyntax>
`
const ste = `
import React, { useState } from "react"


const Hello = ()=><h1>Hello World</h1>

//<xyntax path="./test-result.js" example1>
{
    //<x-jsx>
    <div>
        <button onClick = {onClickHandle}>
            I'm a button div
            const s = 78;
        </button>
        <img srr="app.png"/>
    </div>
    //</x-jsx>
}
//</xyntax>
`




const {ParseString} = require('../dist/lib/index')

ParseString(st,__dirname);

