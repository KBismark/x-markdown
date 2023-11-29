
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import {ParseString} from '../index'

function parseDirectory(srcDir:string,rootDir:string){
    let srcDirContent:string[];
    try {
        srcDirContent = readdirSync(srcDir,{encoding:'utf8'});
    } catch (error) {
        return false;
    }
    for(let i = 0;i<srcDirContent.length;i++){
        parseFile(join(srcDir,'/',srcDirContent[i]),rootDir)
    }
    return true;
}

export function parseFile(srcFile:string,rootDir:string){
    if(!parseDirectory(srcFile,rootDir)){
        if(/(\.xmd\.[a-zA-Z]+)$/.test(srcFile)){
            ParseString(readFileSync(srcFile,'utf8'),rootDir);
        }
        
    }
}

