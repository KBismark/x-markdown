
const fs = require('fs');
const path = require('path');

function getCharacter(numb) {
    return String.fromCharCode(numb)
}
let ids = 8765;
const replacerIdentifiers = {
    string: getCharacter(ids++),
    comment: getCharacter(ids++),
    markdown: getCharacter(ids++),
    bluekeys: getCharacter(ids++),
    customkeys: getCharacter(ids++),
    greenkeys: getCharacter(ids++),
    pinkkeys: getCharacter(ids++),
    yellowkeys: getCharacter(ids++),
    varkeys: getCharacter(ids++),
    methodkeys: getCharacter(ids++),
    text: getCharacter(ids++),
    jsx: getCharacter(ids++),
    jsxJS: getCharacter(ids++),
    markdownJS: getCharacter(ids++),
    Chars: {
        ls: getCharacter(ids++),
        gt: getCharacter(ids++),
        lslash:getCharacter(ids++),
    },
    pathID:getCharacter(ids++)
}

const {ls,gt,lslash } = replacerIdentifiers.Chars;

// ("[^"\n]*(?<!\\)")
const rand = `${Math.random()}`.replace('.','');
//const stringRand = `${replacerIdentifiers.string}${rand}_`
const stringsPattern = /('((?<=\\)'|[^'\n])*')|("((?<=\\)"|[^"\n])*")|(`((?<=\\)`|[^`])*`)/gs;
//const commentRand = `${replacerIdentifiers.comment}${rand}_`
const commentsPattern = /(\/\*(.*?)\*\/)|(\/\/(.*?)\n)/gs;

const xmarkdownPattern = /\/\/<x-markdown\s+path\s*=\s*('\S+'|"\S+")\s+[a-zA-Z-0-9\$_]+>\s*{(.*?)}\s*\/\/<\/x-markdown>/gs;
const xjsxPattern = /\s*\/\/<x-jsx>(.*?)\/\/<\/x-jsx>\s*\n/gs;
const xjsxJSPattern = /((?<=\/\/<>\s*){(.*?)})(?=\s*\/\/<\/>)/gs;
const xtextPattern = /<x-text>(.*?)<\/x-text>/gs;

const writePattern = /\/\/[ ]+\\write[ ]+[^\n]+\n\s*\S/gs;
//const JSVariables = /[a-zA-Z$_][0-9a-zA-Z$_]*/gs;

/**
 * 
 * @param {keyof typeof replacerIdentifiers} name 
 * @returns {string}
 */
function getReplacer(name){
    return `${replacerIdentifiers[name]}${rand}_`;
}
/**
 *
 * @param {string} text
 */
function excapeRegexChars(text) {
    return text.replace(/[\\[.*+(?{^$|})]/g, "\\$&");
}

const nonBreakingCharacters = {
    all: [
        ';',':','{','}','(',')','[',']',',','<','>','+','-','*','/','|','&','^','%','!','~','?','=','\\s','.'
    ],
    start: [
        ';',':','{','(',',','[','<','>','+','-','*','/','|','&','%','!','~','?','=','\\s'
    ],
    end: [
        ';','}','(',',',']','<','>','+','-','*','/','|','&','%','!','~','?','=','\\s','.'
    ],
}

const blueKeywords = {
    // JavaScript keywords
    keys: [
        //'class',
        'const',
        'debugger',
        'delete', 
        'enum',
        'extends',
        'function',
        'implements',
        'interface',
        'private',
        'public',
        'super',
        'yield',
        'let',
        'var',
        'void',
        'with',
        'typeof',
        'instanceof',
        'new',
        'this',
        'true',
        'false',
        'null',
        'undefined',
        'NaN',
        'Infinity',
        'arguments',
        'in',
        'of',
        'get',
        'set',
        'async',

    ],
    pattern() {
        const keys = [...this.keys, 'class'];
        const startingPattern = `(?<!\\S)\\b(${keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        this.pattern = new RegExp(pattern, 'gs');
    },
    classname:'blue-keyword'
}
blueKeywords.pattern();




const pinkKeywords = {
    // JavaScript keywords
    keys: [
        'await',
        'break',
        'case',
        'case:',
        'catch',
        'continue',
        'export',
        'as',
        'default',
        'from',
        'finally',
        'while',
        'do',
        'else',
        'if',
        'return',
        'switch',
        'throw',
        'try',
        'for',
        'import',


    ],
    pattern() {
        const startingPattern = `(?<!\\S)\\b(${this.keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${this.keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        this.pattern = new RegExp(pattern, 'gs');
    },
     classname:'pink-keyword'
}
pinkKeywords.pattern();

const greenVariables = {
    // JavaScript pre-defined modules
    keys: [
        'Array',
        'Date',
        'RegExp',
        'Promise',
        'Set',
        'Map',
        'WeakSet',
        'WeakMap',
        'Function',
        'Boolean',
        'String',
        'Number',
        'Symbol',
        'Object',
        'Element',
        'Node',
        'Document',
        'Window',
        'Math',
        'JSON',


    ],
    pattern() {
        const startingPattern = `(?<!\\S)\\b(${this.keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${this.keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        this.pattern = new RegExp(pattern, 'gs');
    },
     classname:'green-keyword'
}
greenVariables.pattern()

const methodVariables = {
    // JavaScript variables ^(?!y$)x$
    keys: '[a-zA-Z\\$_][0-9a-zA-Z\\$_]*',
    pattern() { 
        const startingPattern = `(?<!\\S)\\b(${this.keys})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')}|${excapeRegexChars('.')})\\b(${this.keys})\\b)`
        const pattern = `(${startingPattern})(?=\\s*\\()`
        this.pattern = new RegExp(pattern, 'gs');
    },
     classname:'yellow-keyword'
}
methodVariables.pattern();

const jsVariables = {
    // JavaScript variables
    keys: '[a-zA-Z\\$_][0-9a-zA-Z\\$_]*',
    pattern() { 
        const startingPattern = `(?<!\\S)\\b(${this.keys})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')}|${excapeRegexChars('.')})\\b(${this.keys})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        this.pattern = new RegExp(pattern, 'gs');
    },
     classname:'cyan-keyword'
}
jsVariables.pattern();

const htmltagsExtendsBluekeys = {
    // HTML tags
    keys: [
        'a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','br','button','canvas','caption','center',
        'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form',
        'frame', 'frameset', 'h1','h2','h3','h4','h5','h6','head','header','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','meta','meter','nav','noframes',
        'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source',
        'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul',
        'var','video','wbr'
    ],
    pattern() {
        const startingBluePattern = `(?<!\\S)\\b(${blueKeywords.keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${blueKeywords.keys.join('|')})\\b)`
        const bluePattern = `(${startingBluePattern})(?!=\\S)|(${startingBluePattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        const startingPattern = `((?<=${excapeRegexChars('<')}|${excapeRegexChars('</')}[ ]*)\\b(${this.keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?=\\s*${excapeRegexChars('>')}|\\s*${excapeRegexChars('/>')}|\\s+\\S*${excapeRegexChars('>')}|\\s+\\S*${excapeRegexChars('/>')})`
        this.pattern = new RegExp(`(${bluePattern})|(${pattern})`, 'gs');
    },
     classname:'html-tag'
}
htmltagsExtendsBluekeys.pattern();

const customtags = {
    // Custom tags
    keys: '[A-Z\\$][0-9a-zA-Z\\$_]*',
    pattern() {
       const startingPattern = `((?<=${excapeRegexChars('<')}|${excapeRegexChars('</')}[ ]*)\\b(${this.keys})\\b)`
        const pattern = `(${startingPattern})(?=\\s*${excapeRegexChars('>')}|\\s*${excapeRegexChars('/>')}|\\s+\\S*${excapeRegexChars('>')}|\\s+\\S*${excapeRegexChars('/>')})`
        this.pattern = new RegExp(`${pattern}`, 'gs');
    },
     classname:'html-tag'
}
customtags.pattern();

/**
 * 
 * @param {string} code 
 * @returns 
 */
function write(code){
    let writes = code.match(writePattern);
    if(!writes) return code;
    let word,length; 
    for(let i = 0; i <writes.length;i++){
        word = writes[i];
        length = word.length;
        word = word.replace(/\/\/[ ]+\\write[ ]+/,'');
        if(/(\s+\\n\s*\n\s*\S)$/.test(word)){
            code = code.replace(writes[i],word.split('\\n').join(''))
        }else{
            word = word.replace(/(\s*\n\s*\S)$/,'')
            code = code.replace(writes[i],`${word} ${writes[i][length-1]}`)
        }
       
    }
    return code;
}
/**
 * 
 * @param {string} code 
 */
function parseJSOnly(maincode) {
    let data = RemoveToken('string', maincode, stringsPattern);
    const strings = data.string;
    data = RemoveToken('comment', write(data.code), commentsPattern)
    const comments = data.comment;
    data = RemoveToken('bluekeys', data.code, htmltagsExtendsBluekeys.pattern)
    const bluekeys = data.bluekeys;
    data = RemoveToken('customkeys', data.code, customtags.pattern)
    const customtagkeys = data.customkeys;
    data = RemoveToken('pinkkeys', data.code, pinkKeywords.pattern)
    const pinkkeys = data.pinkkeys;
    data = RemoveToken('greenkeys', data.code, greenVariables.pattern)
    const greenkeys = data.greenkeys;
    data = RemoveToken('yellowkeys', data.code, methodVariables.pattern)
    const yellowkeys = data.yellowkeys;
    data = RemoveToken('varkeys', data.code, jsVariables.pattern)
    const varkeys = data.varkeys;
    let code = data.code;
    data = null;
    code =
        ReplaceToken(
            'comment', 'commentx',
            ReplaceToken(
                'string', 'stringx',
                ReplaceToken(
                    'bluekeys', 'key1x',
                    ReplaceToken(
                        'customkeys','predefx',
                        ReplaceToken(
                            'pinkkeys', 'key2x',
                            ReplaceToken(
                                'greenkeys', 'predefx',
                                ReplaceToken(
                                    'yellowkeys', 'methx',
                                    ReplaceToken(
                                        'varkeys', 'varx',
                                        code, varkeys
                                    ), yellowkeys
                                ), greenkeys
                            ), pinkkeys
                        ), customtagkeys
                    ), bluekeys
                )
                , strings
            )
            , comments
        );
    return code;
}

/**
 * 
 * @param {string} code 
 */
function parseJSX(maincode) {
    let data = RemoveToken('string', maincode, stringsPattern);
    const strings = data.string;
    data = RemoveToken('comment', write(data.code), commentsPattern)
    const comments = data.comment;
    data = RemoveToken('text', data.code, xtextPattern)
    const texts = data.text;
    data = RemoveToken('bluekeys', data.code, htmltagsExtendsBluekeys.pattern)
    const bluekeys = data.bluekeys;
    data = RemoveToken('customkeys', data.code, customtags.pattern)
    const customtagkeys = data.customkeys;
    data = RemoveToken('pinkkeys', data.code, pinkKeywords.pattern)
    const pinkkeys = data.pinkkeys;
    data = RemoveToken('greenkeys', data.code, greenVariables.pattern)
    const greenkeys = data.greenkeys;
    data = RemoveToken('yellowkeys', data.code, methodVariables.pattern)
    const yellowkeys = data.yellowkeys;
    data = RemoveToken('varkeys', data.code, jsVariables.pattern)
    const varkeys = data.varkeys;
    let code = data.code;
    data = null;
    code =
        ReplaceToken(
            'comment', 'commentx',
            ReplaceToken(
                'string', 'stringx',
                ReplaceToken(
                    'text','text',
                    ReplaceToken(
                        'bluekeys', 'key1x',
                        ReplaceToken(
                            'customkeys','predefx',
                            ReplaceToken(
                                'pinkkeys', 'key2x',
                                ReplaceToken(
                                    'greenkeys', 'predefx',
                                    ReplaceToken(
                                        'yellowkeys', 'methx',
                                        ReplaceToken(
                                            'varkeys', 'varx',
                                            code, varkeys
                                        ), yellowkeys
                                    ), greenkeys
                                ), pinkkeys
                            ), customtagkeys
                        ), bluekeys
                    ), texts
                ), strings
            ), comments
        );
    return code;
}




/**
 * 
 * @param {string} code 
 */
function parseMarkdown(maincode,relativeDirectory) {
    // let data = RemoveToken('string', maincode, stringsPattern);
    // const strings = data.string;
    let data = RemoveToken('markdownJS', maincode, xmarkdownPattern)
    maincode =data.code;
    const markdownJS = data.markdownJS;
    let markdown = [];
    let replacer = `${replacerIdentifiers.string}${rand}_`;
    let markdownCode;
    for (let i = 0; i < markdownJS.length; i++) {
        markdownCode = markdownJS[i].replace(/\n\t|\n  /gs,'\n');
        data = RemoveToken('jsx', markdownCode, xjsxPattern);
        markdown.push({
            jsx: data.jsx,
            code: data.code,
            JS: [],
            jsxCode: ''
        })
    }
    
    let levelJS, j, lenth, parsedJS;
    let levelJSX,levelCode;
    let pathCode = '',srcPath='';
    for (let i = 0; i < markdown.length; i++) { 
        levelJSX = markdown[i].jsx;
        srcPat = pathCode = '';
        let startPattern = /\s*\/\/<x-jsx>\s*\n/;
        let endPattern = /\s*\/\/<\/x-jsx>\s*\n/;
        replacer = `${replacerIdentifiers.jsxJS}${rand}_`;
        for (j = 0; j < levelJSX.length; j++){
            levelJSX[j] = levelJSX[j].replace(startPattern, '').replace(endPattern, '');
            levelJSX[j] = parseJSX(levelJSX[j]);
            
            data = RemoveToken('jsxJS', levelJSX[j], xjsxJSPattern)
           
            lenth = data.jsxJS.length;
            for (let k = 0; k < lenth; k++) {
                parsedJS = parseJSOnly(data.jsxJS[k]);
                    levelJSX[j] = levelJSX[j].replace(`${replacer}${k}${replacer}`,
                    `${ls}div class="xmk-js2x"${gt}${parsedJS}${lslash}div${gt}`
                );
            }

        }
        
        startPattern = /\/\/<x-markdown\s+path\s*=\s*('\S+'|"\S+")\s+[a-zA-Z-0-9\$_]+>\s*{/;
        endPattern = /}\s*\/\/<\/x-markdown>/;

        levelCode = markdown[i].code;
        let markdownId = levelCode.match(/\/\/<x-markdown\s+path\s*=\s*('\S+'|"\S+")\s+[a-zA-Z-0-9\$_]+>/gs)[0];
        
        markdownId = markdownId.replace(/\/\/<x-markdown\s+path\s*=\s*('|")/,'').replace(/>$/,'').split(/\s+/);
        let writeToFilePath = markdownId[0].replace(/('|")$/,'');
        markdownId =  markdownId[1];
        levelCode = levelCode.replace(startPattern, ' ').replace(endPattern, ' ');
        levelCode = parseJSOnly(levelCode);
        replacer = `${replacerIdentifiers.jsx}${rand}_`;
        lenth = levelJSX.length;
        for (let k = 0; k < lenth; k++) {
            levelCode = levelCode.replace(`${replacer}${k}${replacer}`, `${ls}div class="xmk-jsx"${gt}${levelJSX[k]}${lslash}div${gt}`);
        }
        levelCode = `${ls}div class="xmk-js1x"${gt}${levelCode}${lslash}div${gt}`;
        levelCode = levelCode.replace(/&/gs, '&#38').replace(/</gs, '&#60;').replace(/>/gs, '&#62;')
            .replace(/\//gs, '&#47;').replace(/\{/gs, '&#123;').replace(/\}/gs, '&#125;').replace(/`/gs,'&#96;')
            .replace(RegExp(`${ls}`, 'gs'), '<').replace(RegExp(`${lslash}`, 'gs'), '</').replace(RegExp(`${gt}`, 'gs'), '>');
        
        markdown[i] = '';
        replacer = `${replacerIdentifiers.markdownJS}${rand}_`;
        maincode = maincode.replace(`${replacer}${i}${replacer}`, '\n');
        srcPath = path.resolve(relativeDirectory,writeToFilePath);
        pathCode = fs.readFileSync(srcPath,'utf8');
        replacer = getReplacer('pathID');
        let allToReplace = pathCode.match(RegExp("(?<!\\\\)`[\\s\\S]*?(?<!\\\\)`\\s*;*\\s*\\/\\/[ ]*\\\\insert[ ]+"+markdownId,'gs'))
        if(!allToReplace){
            continue
        }
        console.log(allToReplace);
        pathCode = pathCode.replace(RegExp("(?<!\\\\)`[\\s\\S]*?(?<!\\\\)`\\s*;*\\s*\\/\\/[ ]*\\\\insert[ ]+"+markdownId,'gs'),replacer)
        for(let i=0;i<allToReplace.length;i++){
            pathCode = pathCode.replace(replacer, `\`${levelCode}\`; // \\insert ${markdownId} `)
        }
        fs.writeFileSync(srcPath,pathCode);
    }
    return maincode;
}

/**
 * 
 * @param {keyof typeof replacerIdentifiers} name 
 * @param {string} code 
 * @param {RegExp} pattern 
 * @returns 
 */
function RemoveToken(name,code,pattern) {
    let matches = code.match(pattern);
    const replacer = getReplacer(name);
    if (matches) {
      for (let i = 0; i < matches.length; i++){
        code = code.replace(matches[i], `${replacer}${i}${replacer}`);
      }
      if(name=='text'){
        matches = matches.join(replacer).replace(/<x-text>/gs,'').replace(/<\/x-text>/gs,'').split(replacer);
      }
    } else {
      matches = [];
    }
    const data = { code };
    data[name] = matches;
    return data;
}
/**
 * 
 * @param {keyof typeof replacerIdentifiers} name 
 * @param {string} classname
 * @param {string} code 
 * @param {string[]} tokens 
 * @returns 
 */
function ReplaceToken(name,classname, code, tokens) {
    const replacer = getReplacer(name);
    for (let i = 0; i < tokens.length; i++){
      code = code.replace(`${replacer}${i}${replacer}`,`${ls}span class="xmk-${classname}"${gt}${tokens[i]}${lslash}span${gt}`);
    }
    return code;
}
  

module.exports = parseMarkdown;


parseMarkdown(`

const s = 4;

//<x-markdown selevtive>
{
    const s = 56;
}
//</x-markdown>
let rt = 90;
//<x-markdown path = './test/app.js' code>
{
    const hello = 'world';
    if(hello){
        console.log(hello)
        console.log(7 > 6);
    }
    // \\write export 
    const App = ({data,options})=>{

        return (
            //<x-jsx>
            <div>
                <h1><x-text>Hello World</x-text></h1>
                {state.count}
                okay
                {(()=>{
                    const hello = RegExp('');
                    return <Figure />
                })()}
            </div>
            //</x-jsx>
        )
    }
}
//</x-markdown>
//<x-markdown selevtive>
{
    const s = 56;
}
//</x-markdown>
`,__dirname)



