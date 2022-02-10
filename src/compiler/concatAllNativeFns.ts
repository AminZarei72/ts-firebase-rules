import * as fs from 'fs';
// import { native } from './index';

/* =============================== */
export function concatAllNativeFns(nativeFilesPath: string, ourNativeHelperFnsPath: string): string {
    /* concat all other native functions */
    /* ausdhiu23 */
    const allRuleFiles = fs.readdirSync(nativeFilesPath, { encoding: 'utf-8' });
    const ourNativeHelperFns = fs.readFileSync(ourNativeHelperFnsPath, { encoding: 'utf-8' })
    let concatedNativeFiles = '' + ourNativeHelperFns ? ourNativeHelperFns : ''
    for (let index = 0; index < allRuleFiles.length; index++) {
        const element = allRuleFiles[index]; /* todo:just get .rules from here  */
        const currentRuleFile = fs.readFileSync(nativeFilesPath + '/' + element, { encoding: 'utf-8' });
        concatedNativeFiles += currentRuleFile ? currentRuleFile : '';
    }
    /* enableThis */
    /* finalRules =  */
    // const ourNativeHelperFns = fs.readFileSync(ourNativeHelperFnsPath, { encoding: 'utf-8' });
    return concatedNativeFiles;
}
