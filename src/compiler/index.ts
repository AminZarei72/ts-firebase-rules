import * as fs from 'fs-extra';
import { concatAllNativeFns } from './concatAllNativeFns';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// const sourceDir = '../'
// const compiledTsFile = sourceDir + 'build/typedFns/groups/create_groups.js'
/* const compiledTsFile = sourceDir + '/build/finalFile.js' */ /* enableThis */
// const compiledTsFile = sourceDir + '/build/finalFile.js'
// export const native = sourceDir + 'src/nativeFunctions/'
// const rule = sourceDir + 'fbFiles/firestore.rules'
/* const outputFilePath = sourceDir + 'build/firestore.rules' */
// const outputFilePath = '_/firestore.rules'
// const compiledTsReplacer = '//$compiledFunctionsWillBeReplacedWithThis'
// const nativeFunctionsTextToReplace = '//$nativeFirestoreFunctionsWillBeReplacedWithThis'
/* --------------- */
export async function build(args: {
    compiledTsPath: string,
    targetDotRulesPath: string,
    nativeFilesPath: string,
    nativeFunctionsTextToReplace: string,
    outputFilePath: string,
    additionalNativeHelperFnsPath: string,
}) {
    /* --------------- */
    console.log('compiling')
    /* --------------- */
    /* todo:we can get this from user */
    let finalRules = fs.readFileSync(args.targetDotRulesPath, { encoding: 'utf-8' })
    // let finalRules = rules
    /* --------------- */
    // finalRules = finalRules.replace(nativeFunctionsTextToReplace, concatAllNativeFns())
    /* --------------- */
    // finalRules=converters1(compiledTs)
    const compiledTs = fs.readFileSync(args.compiledTsPath, { encoding: 'utf-8' })
    // const compiledTs = newFile ? newFile : fs.readFileSync(compiledTsFile, { encoding: 'utf-8' })
    // const compiledTs = newFile/*  ? newFile : fs.readFileSync(compiledTsFile, { encoding: 'utf-8' }) */
    // finalRules = finalRules.replace(nativeFunctionsTextToReplace, converters1(compiledTs))
    /* --------------- */
    // console.log(args.nativeFilesPath)

    const finalF = `
    //=======================================================
    ${concatAllNativeFns(args.nativeFilesPath, args.additionalNativeHelperFnsPath)}
    //=======================================================
    CompileTheCompiledTsHere
    //=======================================================
    `/* todo:CompileTheCompiledTsHere */

    finalRules = finalRules.replace(args.nativeFunctionsTextToReplace, finalF)

    // finalRules = finalRules.replace(compiledTsReplacer, compiledTs)
    /* --------------- */
    fs.ensureFileSync(args.outputFilePath)
    console.log(args.outputFilePath, finalRules)
    fs.writeFileSync(args.outputFilePath, finalRules)
    /* --------------- */
    /* target.split(search).join(replacement); */
    /* =============================== */
    // function escapeRegExp(string) {
    //     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    // }

    // function replaceAll(str, find, replace) {
    //     return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    // }
    /* =============================== */
    return null
} 