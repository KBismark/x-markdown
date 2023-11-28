

export const stringsPattern = /('((?<=\\)'|[^'\n])*')|("((?<=\\)"|[^"\n])*")|(`((?<=\\)`|[^`])*`)/gs;
export const commentsPattern = /(\/\*(.*?)\*\/)|(\/\/(.*?)\n)/gs;
export const xmarkdownPattern = /\/\/<xyntax\s+path\s*=\s*('\S+'|"\S+")\s+[a-zA-Z-0-9\$_]+>\s*{(.*?)}\s*\/\/<\/xyntax>/gs;
export const xjsxPattern = /\s*\/\/<x-jsx>(.*?)\/\/<\/x-jsx>\s*\n/gs;
export const xjsxJSPattern = /((?<=\/\/<>\s*){(.*?)})(?=\s*\/\/<\/>)/gs;
export const xtextPattern = /<x-text>(.*?)<\/x-text>/gs;
export const writePattern = /\/\/[ ]+\\write[ ]+[^\n]+\n\s*\S/gs;
