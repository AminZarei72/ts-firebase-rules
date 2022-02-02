#!/usr/bin/env node
import sade from 'sade';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import { addCreateToCli } from './addCreateToCli';
const pkg = require('../../package.json');
import * as configs from '../configs'
/* ==================================== */
async function initCli() {
    console.log('***' + chalk.bgBlue('TS') + (chalk.red('FR')) + '***');
    console.info(`***wellcome to ${configs.appName} cli***\n`)
    const cli = sade(configs.appName_cli);
    const templates = { todoList: '  ' }
    const userCurrentPath = (await fs.realpath(process.cwd()))
    addCreateToCli({ templates, userCurrentPath, pkg })
    cli.parse(process.argv);
}
/* ==================================== */
initCli()


