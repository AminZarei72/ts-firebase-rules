/* ===================================================== */
import chalk from 'chalk'
//@ts-ignore
import { Input, Select } from 'enquirer'
import * as fs from 'fs-extra'
import ora from 'ora'
/* ===================================================== */
export function delay(num: number) {
  return new Promise(promise => {
    setTimeout(() => {
      promise(null)
    }, num)
  })
}
/* ===================================================== */
/** note:if u dont want to use async version an "console.log('\n')" should be added after each "addProcess()" */
export async function addProcess(args: {
  text: string,
  successText?: string,
  fn: Function,
  failedText?: string,
  fakeDelay?: number,
}) {
  const bootSpinner = ora(args.text)
  bootSpinner.start()
  /* ------------------------ */
  try {
    if (args.fakeDelay) await delay(args.fakeDelay)
    await args.fn(bootSpinner)
    bootSpinner.succeed(args.successText)
    // `build ${chalk.bold.green(mainDir)}`
    /* =============================== */
    /* opt:also add the licence (and update year like tsd) */
    // return
    /* =============================== */
  } catch (error) {
    if (args.fakeDelay) await delay(args.fakeDelay)
    bootSpinner.fail(args.failedText)
    logError(error)
    process.exit(1)
  }
}
/* ===================================================== */
export function logError(err: any) {
  const stderr = console.error.bind(console)
  const error = err.error || err
  const description = `${error.name ? error.name + ': ' : ''}${error.message ||
    error}`
  const message = error.plugin
    ? error.plugin === 'rpt2'
      ? `(typescript) ${description}`
      : `(${error.plugin} plugin) ${description}`
    : description

  stderr(chalk.bold.red(message))

  if (error.loc) {
    stderr()
    stderr(`at ${error.loc.file}:${error.loc.line}:${error.loc.column}`)
  }

  if (error.frame) {
    stderr()
    stderr(chalk.dim(error.frame))
  } else if (err.stack) {
    const headlessStack = error.stack.replace(message, '')
    stderr(chalk.dim(headlessStack))
  }

  stderr()
}
/* ===================================================== */

/* ============================ */
export async function chooseATemplate(args: {
  templates: string[],
  templateAsOption: string,
  bootSpinner?: ora.Ora,
}): Promise<string> {

  let template = ''
  const prompt = new Select({
    message: 'Choose a template',
    choices: args.templates,
  })

  // console.log(opts.template)
  if (args.templateAsOption && typeof args.templateAsOption == 'string') {
    template = args.templateAsOption?.trim()
    if (!args.templates.includes(template)) {
      args.bootSpinner?.fail(`Invalid template ${chalk.bold.red(template)}`)
      await args.bootSpinner?.stop()
      template = await prompt.run()

    }
  } else {
    await args.bootSpinner?.stop()
    template = await prompt.run()
  }
  return template
}
/* ============================ */
export async function askUserForADir(args: {
  // projectPath: string,
  bootSpinner?: ora.Ora,
  mainDir: string,
  userCurrentPath: string,
}): Promise<{
  userCurrentProjectPath: string
  mainDir: string
}> {

  let userCurrentProjectPath = args.userCurrentPath + '/' + args.mainDir
  const exists = await fs.pathExists(userCurrentProjectPath)
  if (!exists) {
    return {
      userCurrentProjectPath: userCurrentProjectPath,
      mainDir: args.mainDir
    }
  }

  args.bootSpinner?.fail(`Failed to create ${chalk.bold.red(args.mainDir)}, A folder named ${chalk.bold.red(args.mainDir)} already exists!`)
  const prompt = new Input({
    message: `${chalk.bold('Choose a different name')}`,
    initial: args.mainDir + '-1',
    result: (v: string) => v.trim(),
  })

  const mainDir = await prompt.run()
  // projectPath = args.currentPath + '/' + mainDir
  args.bootSpinner?.start(`Creating ${chalk.bold.green(mainDir)}...`)
  return await askUserForADir({
    ...args,
    mainDir: mainDir,
  })

}
