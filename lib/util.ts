
import fs from 'fs';
import path from 'path';
import {ParseString} from '../index'

function parseDirectory(srcDir:string,rootDir:string){
    let srcDirContent:string[];
    try {
        srcDirContent = fs.readdirSync(srcDir,{encoding:'utf8'});
    } catch (error) {
        return false;
    }
    for(let i = 0;i<srcDirContent.length;i++){
        parseFile(path.join(srcDir,'/',srcDirContent[i]),rootDir)
    }
    return true;
}

export function parseFile(srcFile:string,rootDir:string){
    if(!parseDirectory(srcFile,rootDir)){
        ParseString(fs.readFileSync(srcFile,'utf8'),rootDir);
    }
}

