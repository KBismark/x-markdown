import { customtags, greenVariables, htmltagsExtendsBluekeys, jsVariables, methodVariables, pinkKeywords } from "../constants";
import { RemoveToken, ReplaceToken, write } from "../helper";
import { commentsPattern, stringsPattern, xtextPattern } from "../patterns";

export function parseJSX(maincode:string) {
    let data: null|ReturnType<typeof RemoveToken> = RemoveToken('string', maincode, stringsPattern);
    const strings = data.string;
    data = RemoveToken('comment', write(data.code), commentsPattern)
    const comments = data.comment;
    data = RemoveToken('text', data.code, xtextPattern)
    const texts = data.text;
    data = RemoveToken('bluekeys', data.code, htmltagsExtendsBluekeys.pattern)
    const bluekeys = data.bluekeys;
    data = RemoveToken('customkeys', data.code, customtags.pattern)
    const customtagkeys = data.customkeys;
    data = RemoveToken('pinkkeys', data.code, pinkKeywords.pattern)
    const pinkkeys = data.pinkkeys;
    data = RemoveToken('greenkeys', data.code, greenVariables.pattern)
    const greenkeys = data.greenkeys;
    data = RemoveToken('yellowkeys', data.code, methodVariables.pattern)
    const yellowkeys = data.yellowkeys;
    data = RemoveToken('varkeys', data.code, jsVariables.pattern)
    const varkeys = data.varkeys;
    let code = data.code;
    data = null;
    code =
        ReplaceToken(
            'string', 'stringx',
            ReplaceToken(
                'comment', 'commentx',
                ReplaceToken(
                    'text','text',
                    ReplaceToken(
                        'bluekeys', 'key1x',
                        ReplaceToken(
                            'customkeys','predefx',
                            ReplaceToken(
                                'pinkkeys', 'key2x',
                                ReplaceToken(
                                    'greenkeys', 'predefx',
                                    ReplaceToken(
                                        'yellowkeys', 'methx',
                                        ReplaceToken(
                                            'varkeys', 'varx',
                                            code, varkeys
                                        ), yellowkeys
                                    ), greenkeys
                                ), pinkkeys
                            ), customtagkeys
                        ), bluekeys
                    ), texts
                ), comments
            ), strings 
        );
    return code;
}