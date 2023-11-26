
//const stringRand = `${replacerIdentifiers.string}${rand}_`
export const stringsPattern = /('((?<=\\)'|[^'\n])*')|("((?<=\\)"|[^"\n])*")|(`((?<=\\)`|[^`])*`)/gs;
//const commentRand = `${replacerIdentifiers.comment}${rand}_`
export const commentsPattern = /(\/\*(.*?)\*\/)|(\/\/(.*?)\n)/gs;

export const xmarkdownPattern = /\/\/<x-markdown\s+path\s*=\s*('\S+'|"\S+")\s+[a-zA-Z-0-9\$_]+>\s*{(.*?)}\s*\/\/<\/x-markdown>/gs;
export const xjsxPattern = /\s*\/\/<x-jsx>(.*?)\/\/<\/x-jsx>\s*\n/gs;
export const xjsxJSPattern = /((?<=\/\/<>\s*){(.*?)})(?=\s*\/\/<\/>)/gs;
export const xtextPattern = /<x-text>(.*?)<\/x-text>/gs;

export const writePattern = /\/\/[ ]+\\write[ ]+[^\n]+\n\s*\S/gs;
//const JSVariables = /[a-zA-Z$_][0-9a-zA-Z$_]*/gs;