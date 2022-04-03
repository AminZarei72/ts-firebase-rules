export const appName = 'ts-firebase-rules'
export const appName_cli = 'tsfr' 
export const fakeDelay = 'development' === process.env.NODE_ENV ? 0 : 500

export const tsfr_config_fileName = `tsfr.config.json`


// export const additionalHelperFnsPath = `../../otherRequiredFiles/helpers/index.ts`
// export const additionalHelperFnsPath = `helpers/index.ts`/* this file will be searched whitin tsconfig_forCompiling.json */
export const additionalHelperFnsPath = `helpers/**/*.ts`/* this file will be searched whitin tsconfig_forCompiling.json */
export const tsconfig_forCompilingPath = `../../otherRequiredFiles/tsconfig_forCompiling.json`
// export const additionalHelperTypesPath = `../../otherRequiredFiles/tsfrTypes/index.ts`
// export const additionalHelperTypesPath = `tsfrTypes/index.ts`
export const additionalHelperTypesPath = `tsfrTypes/**/*.ts`
// export const tscPath = `../../otherRequiredFiles/typescript/bin/tsc`
export const tscPath = `../../../ts_for_tsfr/bin/tsc`
export const compiledTsPath = `../../otherRequiredFiles/compiledTs.js`

export const additionalNativeHelperFnsPath = `../../otherRequiredFiles/helpers/nativeFunctions.rules`

export const nativeFunctionsTextToReplace = '//<<$nativeFirestoreFunctionsWillBeReplacedWithThis>>;'
