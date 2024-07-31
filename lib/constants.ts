import { excapeRegexChars, getCharacter } from "./global";

let ids = 8765;
// let ids = 2;
export const replacerIdentifiers = {
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

export const {ls,gt,lslash } = replacerIdentifiers.Chars;

export const nonBreakingCharacters = {
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

type KeyWords = {keys:string|string[];pattern?: any, init:(this: KeyWords, a?:any, flag?: string)=>RegExp;classname:string;}

export const blueKeywords: KeyWords = {
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
    init(key, flag) {
        key = typeof key === 'string'? [key]: this.keys;
        const keys = [...key as string[], 'class'];
        const startingPattern = `(?<!\\S)\\b(${keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        return new RegExp(pattern, flag);
    },
    classname:'blue-keyword'
}
blueKeywords.pattern = blueKeywords.init(undefined, 'gs');

export const pinkKeywords: KeyWords = {
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
    init(key, flag) {
        key = typeof key === 'string'? [key]: this.keys;
        const startingPattern = `(?<!\\S)\\b(${(key as string[]).join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${(key as string[]).join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        return new RegExp(pattern, flag);
    },
     classname:'pink-keyword'
}
pinkKeywords.pattern = pinkKeywords.init(undefined, 'gs');

export const greenVariables: KeyWords = {
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
    init(key, flag) {
        key = typeof key === 'string'? [key]: this.keys;
        const startingPattern = `(?<!\\S)\\b(${(key as string[]).join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${(key as string[]).join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        return new RegExp(pattern, flag);
    },
     classname:'green-keyword'
}
greenVariables.pattern = greenVariables.init(undefined, 'gs')

export const methodVariables: KeyWords = {
    // JavaScript variables ^(?!y$)x$
    keys: '[a-zA-Z\\$_][0-9a-zA-Z\\$_]*',
    init(key, flag) {
        key = key||this.keys
        const startingPattern = `(?<!\\S)(${key})|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')}|${excapeRegexChars('.')})${key})`
        // const startingPattern = `(?<=\\s|[^\\S])(${key})`
        const pattern = `(${startingPattern})(?=\\s*\\()`
        return new RegExp(pattern, flag);
    },
     classname:'yellow-keyword'
}
methodVariables.pattern = methodVariables.init(undefined, 'gs');

export const jsVariables: KeyWords = {
    // JavaScript variables
    keys: '[a-zA-Z\\$_][0-9a-zA-Z\\$_]*',
    init(key, flag) {
        key = key||this.keys
        const startingPattern = `(?<!\\S)\\b(${key})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')}|${excapeRegexChars('.')})\\b(${key})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        return RegExp(pattern, 'gs');
    },
     classname:'cyan-keyword'
}
jsVariables.pattern = jsVariables.init(undefined, 'gs')

export const htmltagsExtendsBluekeys: KeyWords = {
    // HTML tags
    keys: [
        'a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','br','button','canvas','caption','center',
        'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form',
        'frame', 'frameset', 'h1','h2','h3','h4','h5','h6','head','header','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','meta','meter','nav','noframes',
        'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source',
        'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul',
        'var','video','wbr'
    ],
    init(key, flag) {
        key = typeof key === 'string'? [key]: this.keys;
        const startingBluePattern = `(?<!\\S)\\b(${(blueKeywords.keys as string[]).join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${(blueKeywords.keys as string[]).join('|')})\\b)`
        const bluePattern = `(${startingBluePattern})(?!=\\S)|(${startingBluePattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        const startingPattern = `((?<=${excapeRegexChars('<')}|${excapeRegexChars('</')}[ ]*)\\b(${(key as string[]).join('|')})\\b)`
        const pattern = `(${startingPattern})(?=\\>|\\/\\>|.*?\\/\\>|.*?\\>)|${bluePattern}`
        return new RegExp(pattern, flag);
    },
     classname:'html-tag'
}
htmltagsExtendsBluekeys.pattern = htmltagsExtendsBluekeys.init(undefined, 'gs');

export const customtags: KeyWords = {
    // Custom tags
    keys: '[A-Z\\$][0-9a-zA-Z\\$_]*',
    init(key, flag) {
        key = key||this.keys
       const startingPattern = `((?<=${excapeRegexChars('<')}|${excapeRegexChars('</')}[ ]*)\\b(${key})\\b)`
        const pattern = `(${startingPattern})(?=\\s*${excapeRegexChars('>')}|\\s*${excapeRegexChars('/>')}|\\s+(.*?)\\s*${excapeRegexChars('>')}|\\s+(.*?)\\s*${excapeRegexChars('/>')})`
        return new RegExp(`${pattern}`, 'gs');
    },
     classname:'html-tag'
}
customtags.pattern = customtags.init(undefined, 'gs')

