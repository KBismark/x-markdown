import { ParseString } from "../index";
const working_directory = process.cwd();
module.exports = (source:any)=>{
    ParseString(source,working_directory);
    return '';
}