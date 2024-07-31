import { ParseMarkdown } from "../index";
const working_directory = process.cwd();
module.exports = (source:any)=>{
    ParseMarkdown(source,working_directory);
    return '';
}