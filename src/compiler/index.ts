import * as fs from 'fs-extra';
import { concatAllNativeFns } from './concatAllNativeFns';
import { compileTheCompiledTs } from './compileTheCompiledTs';
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
/* --------------- */
export function watch(args: {
    compiledTsPath: string,
    targetDotRulesPath: string,
    nativeFilesPath: string,
    nativeFunctionsTextToReplace: string,
    outputFilePath: string,
    additionalNativeHelperFnsPath: string,
}) {
    try {
        /* todo:here we also have to watch native files(recursivly) and rebuild  */
        fs.watchFile(args.compiledTsPath, (current, prev) => {
            console.log(new Date(), 'changes detected, compiling...')
            build({
                compiledTsPath: args.compiledTsPath,
                targetDotRulesPath: args.targetDotRulesPath,
                nativeFilesPath: args.nativeFilesPath,
                nativeFunctionsTextToReplace: args.nativeFunctionsTextToReplace,
                outputFilePath: args.outputFilePath,
                additionalNativeHelperFnsPath: args.additionalNativeHelperFnsPath,
            })
        })
    } catch (error) {
        console.error(error)
    }

}
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
    ${compileTheCompiledTs(compiledTs)}
    //=======================================================
    `/* todo:CompileTheCompiledTsHere */

    finalRules = finalRules.replace(args.nativeFunctionsTextToReplace, finalF)

    // finalRules = finalRules.replace(compiledTsReplacer, compiledTs)
    /* --------------- */
    fs.ensureFileSync(args.outputFilePath)
    // console.log(args.outputFilePath, finalRules)
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