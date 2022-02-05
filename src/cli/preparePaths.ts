import * as fs from 'fs-extra'
import path from 'path'
import * as configs from '../configs'
import chalk from 'chalk';
import * as types from '../types'
// import { logError } from './helpersFns2';
/* ================= */
export async function preparePaths(args: {
    userCurrentPath: string,
    tsfr_config: types.Tsfr_config,
}) {
    const userMainIndexTs = path.resolve(args.userCurrentPath, `./${args.tsfr_config.userMainIndexTs}`) /* #todo:can we get this from a config file? */
    const userTypesPath = path.resolve(args.userCurrentPath, `./${args.tsfr_config.mainDir}/**/*.d.ts`) /* #todo:can we get this from a config file? */
    const additionalHelperFnsPath = path.resolve(__dirname, configs.additionalHelperFnsPath)
    const additionalHelperTypesPath = path.resolve(__dirname, configs.additionalHelperTypesPath)
    const tsconfig_forCompilingPath = path.resolve(__dirname, configs.tsconfig_forCompilingPath) /* #todo:can we get this from a config file? */
    /* ------------------- */
    return {
        userTypesPath,
        additionalHelperFnsPath,
        additionalHelperTypesPath,
        userMainIndexTsPath: userMainIndexTs,
        tsconfig_forCompilingPath,
    }
}
/* ================= */
