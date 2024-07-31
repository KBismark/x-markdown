// const {ParseCodeString} = require('../dist/lib/index');
const {ParseCodeString} = require('../lib/index');
const fs = require('fs');
const path = require('path')

const code = fs.readFileSync(path.join(__dirname, '/code.js'), 'utf8');

const html = fs.readFileSync(path.join(__dirname, '/test.html'), 'utf8');

fs.writeFileSync(
    path.join(__dirname, '/test.html'), 
    html.replace(/<\!\-\-\-\-\>(.*?)<\!\-\-\-\-\>/gs, `\n<!---->\n<pre class="xyntax"><code>${ParseCodeString(code)}</code></pre>\n<!---->\n`) , 
    'utf8'
)
console.log(76);
