/* =========================================== */
import sade from 'sade'
import chalk from 'chalk'
import * as fs from 'fs-extra'
import * as types from '../types'
import path from 'path'
import ora, { Ora } from 'ora'
import { addProcess } from './helpersFns2'
import * as configs from '../configs'
/* =========================================== */
export function addCreateToCli(args: {
    userCurrentPath: string,
    pkg: types.PackageJson,
    templates: string[],
    cli: sade.Sade,
}): void {
    args.cli
        .version(args.pkg.version)
        .command('create')
        .describe('Create a new directory with basic required files to develop a typescript firebase .rules project ')
        .example('create myDirectory')
        .option(
            '--template',
            `Specify a template. Allowed choices: [${args.templates.join(
                ', '
            )}]`
        )
        .example('create --template todoList myDirectory')
        .action(async (cliArgs: { '_': string[], template: string }) => {
            let mainDir = 'tsfr'
            if (cliArgs._?.length > 0) mainDir = cliArgs._[0]
            /* create config here and then when ur bulding or watching check the configfile in running directory */

            await addProcess({
                text: `Creating ${chalk.bold.green(mainDir)}...`,
                successText: `Created ${chalk.bold.green(mainDir)}`,
                failedText: `Failed to create ${chalk.bold.red(mainDir)}`,
                fakeDelay: configs.fakeDelay,
                fn: (bootSpinner: ora.Ora) => addCreateProcessFn({
                    ...args,
                })
            })
            /* ------------------------ */
            /* ------------------------ */
        })
}
/* =========================================== */

function addCreateProcessFn(arg0: { userCurrentPath: string; pkg: types.PackageJson; templates: string[]; cli: sade.Sade }) {
    console.log('creating')
}

/* =========================================== */

