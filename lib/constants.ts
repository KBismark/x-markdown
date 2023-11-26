import { excapeRegexChars, getCharacter } from "./helper";

let ids = 8765;
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

type KeyWords = {keys:string|string[];pattern:any;classname:string}

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
    pattern() {
        const keys = [...this.keys, 'class'];
        const startingPattern = `(?<!\\S)\\b(${keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        this.pattern = new RegExp(pattern, 'gs');
    },
    classname:'blue-keyword'
}
blueKeywords.pattern();

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
    pattern() {
        const startingPattern = `(?<!\\S)\\b(${this.keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${this.keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        this.pattern = new RegExp(pattern, 'gs');
    },
     classname:'pink-keyword'
}
pinkKeywords.pattern();

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
    pattern() {
        const startingPattern = `(?<!\\S)\\b(${this.keys.join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${this.keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?!=\\S)|(${startingPattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        this.pattern = new RegExp(pattern, 'gs');
    },
     classname:'green-keyword'
}
greenVariables.pattern()

export const methodVariables: KeyWords = {
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

export const jsVariables: KeyWords = {
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
    pattern() {
        const startingBluePattern = `(?<!\\S)\\b(${(blueKeywords.keys as string[]).join('|')})\\b|((?<=${nonBreakingCharacters.start.map(excapeRegexChars).join('|')})\\b(${(blueKeywords.keys as string[]).join('|')})\\b)`
        const bluePattern = `(${startingBluePattern})(?!=\\S)|(${startingBluePattern})(?=${nonBreakingCharacters.end.map(excapeRegexChars).join('|')})`
        const startingPattern = `((?<=${excapeRegexChars('<')}|${excapeRegexChars('</')}[ ]*)\\b(${this.keys.join('|')})\\b)`
        const pattern = `(${startingPattern})(?=\\s*${excapeRegexChars('>')}|\\s*${excapeRegexChars('/>')}|\\s+\\S*${excapeRegexChars('>')}|\\s+\\S*${excapeRegexChars('/>')})`
        this.pattern = new RegExp(`(${bluePattern})|(${pattern})`, 'gs');
    },
     classname:'html-tag'
}
htmltagsExtendsBluekeys.pattern();

export const customtags: KeyWords = {
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

