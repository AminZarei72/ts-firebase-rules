/* ===================================================== */
/* ===================================================== */
export function err(reason?: string): any {
    /* todo:add line/file */
    throw new Error("failed to compile!\n" + reason);
    return false
}
/* ===================================================== */
export function escapeStrBeforeRegExp(stringToGoIntoTheRegex: string) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
/* ===================================================== */
export function regexConcater(regexes: (string | RegExp)[], additionalFlags?: string) {
    //   let flags = reg.flags + exp.flags;
    let flagss = '';
    let final = '';
    for (let index = 0; index < regexes.length; index++) {
        const regOrTxt = regexes[index];
        if (typeof regOrTxt === 'string') {
            final += escapeStrBeforeRegExp(regOrTxt);
        } else {
            flagss += regOrTxt.flags;
            final += regOrTxt.source;
        }
    }
    flagss += additionalFlags ? additionalFlags : ''
    // const flagss = regexes.map((regex) => regex.flags).join('');
    const flags = Array.from(new Set(flagss.split(''))).join('');
    // return new RegExp(regexes.map((regex) => regex.source).join(""), flags);
    return new RegExp(final, flags);
}
/* ===================================================== */
