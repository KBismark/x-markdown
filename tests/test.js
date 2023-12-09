
const st = `
import React, { useState } from "react"


const Hello = ()=><h1>Hello World</h1>

//<xyntax path="./test-result.js" example1>
{
    // \\write import './App.css'; \\n 
    // \\write import './xyntax.css' \\n 
    // \\write import { CodeExample_1, CodeExample_2 } from './code-example'; \\n 
    // \\write import './code-example.xmd'; \\n 
    // \\write import React, { useState } from "react" \\n 

    /* const hello = 'Hello Worlds'.match(new RegExp('Hello Worlds'))[0] */
    // code here...
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
    
   // \\write export default App;  \\n
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

