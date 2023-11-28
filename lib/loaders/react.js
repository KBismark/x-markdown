const { ParseString } = require("../..");
const working_directory = process.cwd();
module.exports = (source)=>{
    ParseString(source,working_directory);
    return source;
}