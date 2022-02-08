import sade from 'sade';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as types from '../types';
import path from 'path';
import ora from 'ora';
import { addProcess, askUserForADir, chooseATemplate, delay, logError } from './helpersFns2';
import shell from 'shelljs';
import * as configs from '../configs';
import concurrently from 'concurrently';
// import tsc from 'typescript/lib/typescript';
import { preparePaths } from "./preparePaths";
import { generate_tsconfig_forCompiling } from './generate_tsconfig_forCompiling';
/* =========================================== */
export async function addWatchProcessFn(args: {
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
    /* update paths */
    const {
        tscPath,
        compiledTsPath,
        additionalHelperFnsPath,
        additionalHelperTypesPath,
        userMainIndexTsPath,
        tsconfig_forCompilingPath,
        userTypesPath,
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
    /* write json and to use it later on shell */
    await fs.writeJson(tsconfig_forCompilingPath, tsconfig_forCompiling)
    /* --------------------------------------- */
    /* --------------------------------------- */
    /* add tsc watcher */
    /* compile */
    /* await fs.remove(compiledTsPath) */
    shell.exec(`${tscPath} -w -p ${tsconfig_forCompilingPath} --out ${compiledTsPath} `, {
        async: true,
        silent: false,
    })
    /* if (fs.existsSync(compiledTsPath)) {
        throw 'failed on compiling'
    } */
    /* --------------------------------------- */
    /* Note:the only way to have "out" option is to put it in below file (.outFile wont work!)*/
    /* ---------- */
    /* todo:do the main watchAndCompiling here */
    /* ---------- */
}
/* ======================================================= */
export function addWatchToCli(args: {
    pkg: types.PackageJson,
    templates: string[], cli: sade.Sade,
    userCurrentPath: string,
}): void {
    args.cli
        .version(args.pkg.version)
        .command('watch')
        .describe('watch and compile your ts-firebase-rules project to final ".rules" file')
        .example('watch')
        .action(async () => {
            await addProcess({
                text: 'compiling...',
                successText: `${chalk.bold.green('compiled')}`,
                failedText: `${chalk.bold.red('Failed at compiling')}`,
                fakeDelay: configs.fakeDelay,
                fn: (bootSpinner: ora.Ora) => addWatchProcessFn({
                    bootSpinner,
                    ...args,
                })
            })
        })
}
/* ============================================================== */
