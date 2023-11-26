import { gt, ls, lslash, replacerIdentifiers } from "./constants";
import { writePattern } from "./patterns";

const rand = `${Math.random()}`.replace('.','');

export function getReplacer(name:keyof typeof replacerIdentifiers){
    return `${replacerIdentifiers[name]}${rand}_`;
}

export function getCharacter(numb:number) {
    return String.fromCharCode(numb)
}

export function excapeRegexChars(text:string) {
    return text.replace(/[\\[.*+(?{^$|})]/g, "\\$&");
}

export function write(code:string){
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

export function RemoveToken(name:keyof typeof replacerIdentifiers,code:string,pattern:RegExp): {code:string}&{[k:string]:string[]} {
    let matches:any = code.match(pattern);
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
    const data = { code:code, [name]:matches };
    return data;
}

export function ReplaceToken(name:keyof typeof replacerIdentifiers,classname:string, code:string, tokens:string[]) {
    const replacer = getReplacer(name);
    for (let i = 0; i < tokens.length; i++){
      code = code.replace(`${replacer}${i}${replacer}`,`${ls}span class="xmk-${classname}"${gt}${tokens[i]}${lslash}span${gt}`);
    }
    return code;
}