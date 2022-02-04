/* =========================================== */
import sade from 'sade'
import chalk from 'chalk'
import * as fs from 'fs-extra'
import * as types from '../types'
import path from 'path'
import ora from 'ora'
import { addProcess, askUserForADir, chooseATemplate } from './helpersFns2'
import * as configs from '../configs'
/* =========================================== */

/* =========================================== */
export async function addCreateProcessFn(args: {
    bootSpinner: ora.Ora,
    userCurrentPath: string,
    pkg: types.PackageJson,
    templates: string[],
    cli: sade.Sade,
    mainDir: string,
    cliArgs: { '_': string[], template: string },
}) {

    // const args.bootSpinner
    // const args.mainDir
    let res = await askUserForADir({
        mainDir: args.mainDir,
        userCurrentPath: args.userCurrentPath,
        bootSpinner: args.bootSpinner,
    })
    // let userCurrentProjectPath=res.projectPath
    const finalDir = res.mainDir
    /* ----------------------------- */
    /* opt.todo:default should be todoList */
    let template = await chooseATemplate({
        templateAsOption: args.cliArgs.template,
        templates: args.templates,
        bootSpinner: args.bootSpinner,
    })
    /* ----------------------------- */
    console.log('creating...')
    /* ------------------------------ */
    /* create tsfr_config */
    // const tsfr_config = require(configs.tsfr_config_src_path)
    const tsfr_config = {
        nativeFilesPath: `${finalDir}/native/functions`,
        outputFilePath: `${finalDir}/build/firestore.rules`,
        targetDotRulesPath: `${finalDir}/native/firestore.rules`,
        userMainIndexTs: `${finalDir}/index.ts`,
        // includedTypesPath : `${mainDir}/**/*.d.ts`/* todo:we might be able to rm this */
        mainDir: `${finalDir}`,
    }

    // await fs.writeFile(`../../templates/${template}/tsfr.config.json`, JSON.stringify(tsfr_config))
    /* ------------------------------ */
    /* copy the template */

    args.bootSpinner.start()
    args.bootSpinner.info('copying files...')

    await fs.copy(
        path.resolve(__dirname, `../../templates/${template}`),
        res.userCurrentProjectPath,
    )
    // fs.writeJSONSync(sad,asd,{mode:})
    /* aksjdnjw */
    await fs.writeJson(
        `${args.userCurrentPath}/${configs.tsfr_config_fileName}`,
        tsfr_config,
        // { mode: 2 }
    )
    /* ------------------------------ */
}
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
                    bootSpinner,
                    mainDir,
                    cliArgs,
                })
            })
            /* ------------------------ */
            /* ------------------------ */
        })
}


/* =========================================== */

