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
