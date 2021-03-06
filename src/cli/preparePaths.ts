import * as fs from 'fs-extra'
import path from 'path'
import * as configs from '../configs'
// import chalk from 'chalk';
import * as types from '../types'
// import { logError } from './helpersFns2';
/* ================= */
export async function preparePaths(args: {
    userCurrentPath: string,
    tsfr_config: types.Tsfr_config,
}) {
    const userMainIndexTs = path.resolve(args.userCurrentPath, `./${args.tsfr_config.userMainIndexTs}`) /* [d]todo:can we get this from a config file? */
    const userTypesPath = path.resolve(args.userCurrentPath, `./${args.tsfr_config.mainDir}/**/*.d.ts`) /* [d]todo:can we get this from a config file? */
    /* ------------------- */
    // const additionalHelperFnsPath = path.join(__dirname, configs.additionalHelperFnsPath)
    const additionalHelperFnsPath = configs.additionalHelperFnsPath
    // const additionalHelperTypesPath = path.join(__dirname, configs.additionalHelperTypesPath)
    const additionalHelperTypesPath = configs.additionalHelperTypesPath
    const tsconfig_forCompilingPath = path.join(__dirname, configs.tsconfig_forCompilingPath) /* [d]todo:can we get this from a config file? */
    /* ------------------- */
    /* todo:try npx(careful on old npm versions) */
    let tscPath = path.join(__dirname, configs.tscPath)
    if (!fs.pathExistsSync(tscPath)) {
        let tmp = path.join(__dirname, configs.tscPath2)
        if (!fs.pathExistsSync(tmp)) {
            throw `could not find the typescript compiler form ${tscPath} nor ${tmp} `
        }
        tscPath = tmp
    }
    const compiledTsPath = path.join(__dirname, configs.compiledTsPath)
    /* ------------------- */
    const nativeFilesPath = path.resolve(args.userCurrentPath, `./${args.tsfr_config.nativeFilesPath}`) /* [d]todo:can we get this from a config file? */
    const outputFilePath = path.resolve(args.userCurrentPath, `./${args.tsfr_config.outputFilePath}`) /* [d]todo:can we get this from a config file? */
    const targetDotRulesPath = path.resolve(args.userCurrentPath, `./${args.tsfr_config.targetDotRulesPath}`) /* [d]todo:can we get this from a config file? */
    const additionalNativeHelperFnsPath = path.join(__dirname, configs.additionalNativeHelperFnsPath)
    // const compiledTsPath = path.resolve(__dirname, )
    /* ------------------- */
    /* ------------------- */
    /* ------------------- */
    return {
        userTypesPath,
        additionalHelperFnsPath,
        additionalHelperTypesPath,
        userMainIndexTsPath: userMainIndexTs,
        tsconfig_forCompilingPath,
        compiledTsPath,
        tscPath,
        targetDotRulesPath,
        nativeFilesPath,
        outputFilePath,
        additionalNativeHelperFnsPath,
    }
}
/* ================= */
