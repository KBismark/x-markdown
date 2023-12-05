
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { RemoveToken, getReplacer } from '../helper';
import { xjsxJSPattern, xjsxPattern, xmarkdownPattern } from '../patterns';
import { gt, ls, lslash, replacerIdentifiers } from '../constants';
import { parseJSX } from './jsx';
import { parseJSOnly } from './js';

export function parseMarkdown(maincode:string,relativeDirectory:string) {
    let data:null|ReturnType<typeof RemoveToken> = RemoveToken('markdownJS', maincode, xmarkdownPattern)
    maincode =data.code;
    const markdownJS = data.markdownJS;
    let markdown: {
        jsx: string[],
        code: string,
        JS: any[],
        jsxCode: string
    }[] = [];
    let replacer = getReplacer('string');
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
    let levelJSX:any,levelCode:any;
    let pathCode = '',srcPath='';
    for (let i = 0; i < markdown.length; i++) { 
        levelJSX = markdown[i].jsx;
        srcPath = pathCode = '';
        let startPattern = /\s*\/\/<x-jsx>\s*\n/;
        let endPattern = /\s*\/\/<\/x-jsx>\s*\n/;
        replacer = getReplacer('jsxJS');
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
        
        startPattern = /\/\/<xyntax\s+path\s*=\s*('\S+'|"\S+")\s+[a-zA-Z-0-9\$_]+>\s*{/;
        endPattern = /}\s*\/\/<\/xyntax>/;

        levelCode = markdown[i].code;
        let markdownId:any = levelCode.match(/\/\/<xyntax\s+path\s*=\s*('\S+'|"\S+")\s+[a-zA-Z-0-9\$_]+>/gs)[0];
        
        markdownId = markdownId.replace(/\/\/<xyntax\s+path\s*=\s*('|")/,'').replace(/>$/,'').split(/\s+/);
        let writeToFilePath = markdownId[0].replace(/('|")$/,'');
        markdownId =  markdownId[1];
        levelCode = levelCode.replace(startPattern, ' ').replace(endPattern, ' ');
        levelCode = parseJSOnly(levelCode);
        replacer = getReplacer('jsx');
        lenth = levelJSX.length;
        for (let k = 0; k < lenth; k++) {
            levelCode = levelCode.replace(`${replacer}${k}${replacer}`, `${ls}div class="xmk-jsx"${gt}${levelJSX[k]}${lslash}div${gt}`);
        }
        levelCode = `${ls}div class="xmk-js1x"${gt}${levelCode}${lslash}div${gt}`;
        levelCode = levelCode.replace(/&/gs, '&#38').replace(/</gs, '&#60;').replace(/>/gs, '&#62;')
            .replace(/\//gs, '&#47;').replace(/\{/gs, '&#123;').replace(/\}/gs, '&#125;').replace(/`/gs,'&#96;')
            .replace(RegExp(`${ls}`, 'gs'), '<').replace(RegExp(`${lslash}`, 'gs'), '</').replace(RegExp(`${gt}`, 'gs'), '>');
        
        (markdown as any )[i] = '';
        replacer = getReplacer('markdownJS');
        maincode = maincode.replace(`${replacer}${i}${replacer}`, '\n');
        srcPath = resolve(relativeDirectory,writeToFilePath);
        pathCode = readFileSync(srcPath,'utf8');
        replacer = getReplacer('pathID');
        let allToReplace = pathCode.match(RegExp("(?<!\\\\)`[^`]*?(?<!\\\\)`\\s*;*\\s*\\/\\/[ ]*\\\\insert[ ]+"+markdownId+ "\\s",'gs'))
        if(!allToReplace){
            continue
        }
        pathCode = pathCode.replace(RegExp("(?<!\\\\)`[^`]*?(?<!\\\\)`\\s*;*\\s*\\/\\/[ ]*\\\\insert[ ]+"+markdownId+ "\\s",'gs'),replacer)
        for(let i=0;i<allToReplace.length;i++){
            pathCode = pathCode.replace(replacer, `\`${levelCode}\`; // \\insert ${markdownId} `)
        }
        writeFileSync(srcPath,pathCode);
    }
}