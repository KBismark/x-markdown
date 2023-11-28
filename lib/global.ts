export function getCharacter(numb:number) {
    return String.fromCharCode(numb)
}

export function excapeRegexChars(text:string) {
    return text.replace(/[\\[.*+(?{^$|})]/g, "\\$&");
}