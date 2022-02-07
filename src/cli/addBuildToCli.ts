import sade from 'sade'
import chalk from 'chalk'
import * as types from '../types'
import ora, { promise } from 'ora'
import { addProcess, askUserForADir, chooseATemplate, delay, logError } from './helpersFns2'
import shell from 'shelljs'
import path from 'path'
import * as fs from 'fs-extra'
import * as configs from '../configs'

import { preparePaths } from './preparePaths'
import { generate_tsconfig_forCompiling } from './generate_tsconfig_forCompiling'
/* =========================================== */
export async function addBuildProcessFn(args: {
    bootSpinner: ora.Ora,
    userCurrentPath: string,
    pkg: types.PackageJson,
    templates: string[],
    cli: sade.Sade,
}) {
    /* ---------- */
    /* read user tsfr.config.json */
    const tsfr_config: types.Tsfr_config = await fs.readJson(
        `${args.userCurrentPath}/${configs.tsfr_config_fileName}`,
    )
    if (!tsfr_config || !tsfr_config.mainDir) {
        throw (`
            ${chalk.yellow(configs.tsfr_config_fileName)} not found! \n 
            this is not a tsfr directory!
            `)
    }
    /* ---------- */
    /* update and get paths */
    const {
        additionalHelperFnsPath,
        additionalHelperTypesPath,
        userMainIndexTsPath,
        tsconfig_forCompilingPath,
        userTypesPath,
        compiledTsPath,
        tscPath,
    } = await preparePaths({
        userCurrentPath: args.userCurrentPath,
        tsfr_config,
    })
    /* --------------------------------------- */
    /* generate_tsconfig_forCompiling */
    const tsconfig_forCompiling = await generate_tsconfig_forCompiling({
        additionalHelperFnsPath,
        additionalHelperTypesPath,
        tsfr_config,
        userMainIndexTs: userMainIndexTsPath,
        userTypesPath,
    })
    /* --------------------------------------- */
    /* #todo:compile ts here */
    /* write json and to use it later on shell */
    await fs.writeJson(tsconfig_forCompilingPath, tsconfig_forCompiling)
    /* --------------------------------------- */
    /* compile */
    await fs.remove(compiledTsPath)
    const asd = shell.exec(`${tscPath} -p ${tsconfig_forCompilingPath} --out ${compiledTsPath} `, {})
    if (asd.code != 0 || !fs.existsSync(compiledTsPath)) {
        throw 'could not find compiled file.\n this usually happens if typescript cant compile.'
    }
    /* Note:the only way to have "out" option is to put it below file (.outFile wont work!)*/
    /* ---------- */
    /* todo:compile based on compiled ts */
    console.log('compiling')
    /* ---------- */
}
/* =========================================== */
export function addBuildToCli(args: {
    pkg: types.PackageJson,
    templates: string[],
    cli: sade.Sade,
    userCurrentPath: string,

}): void {
    args.cli
        .version(args.pkg.version)
        .command('build')
        .describe('compile your ts-firebase-rules project to final ".rules" file')
        .example('build')
        .action(async () => {
            await addProcess({
                text: 'compiling...',
                successText: `${chalk.bold.green('compiled')}`,
                failedText: `${chalk.bold.red('Failed at compiling')}`,
                fakeDelay: configs.fakeDelay,
                fn: (bootSpinner: ora.Ora) => addBuildProcessFn({
                    bootSpinner,
                    ...args,
                }),
            })
        })
}
/* ============================================================== */
