export function getCharacter(numb:number) {
    // return `${numb}${Math.random()}`
    return String.fromCharCode(numb)
}

export function excapeRegexChars(text:string) {
    return text.replace(/[\\[.*+(?{^$|})]/g, "\\$&");
}