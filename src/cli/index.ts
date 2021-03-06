#!/usr/bin/env node
import sade from 'sade';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import { addCreateToCli } from './addCreateToCli';
import { addBuildToCli } from './addBuildToCli';
import { addWatchToCli } from './addWatchToCli';
import * as configs from '../configs'
const pkg = require('../../package.json');
/* ==================================== */
async function initCli() {
    console.log('***' + chalk.bgBlue('TS') + (chalk.red('FR')) + '***');
    console.info(`***wellcome to ${configs.appName} cli***\n`)
    const cli = sade(configs.appName_cli);
    const templates = { todoList: '  ' }
    const userCurrentPath = (await fs.realpath(process.cwd()))
    addCreateToCli({
        cli,
        templates: Object.keys(templates),
        pkg,
        userCurrentPath: userCurrentPath
    })
    addBuildToCli({
        cli,
        templates: Object.keys(templates),
        pkg,
        userCurrentPath: userCurrentPath
    })
    addWatchToCli({
        cli,
        templates: Object.keys(templates),
        pkg,
        userCurrentPath: userCurrentPath
    })
    cli.parse(process.argv);
}
/* ==================================== */
initCli()


