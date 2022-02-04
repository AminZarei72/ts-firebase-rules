import shell from 'shelljs'
import * as fs from 'fs-extra'
import * as configs from '../../src/configs'
/* ======================================== */
test('"create" works', async () => {
    expect(1 + 2).toBe(3)
    const res = shell.exec('npx tsfr')
    expect(res.stdout.includes(configs.appName)).toBeTruthy()

    // const res2 = shell.exec('npx tsfr create')
    // const res2 = shell.exec('npx tsfr create --template todoList')
    // expect(res2.stdout.includes('creating')).toBeTruthy()

    const currentDir = `./tmp/e2e1Files`
    const userChoosedDir = `tsfrPrj`
    /* ----------- */
    shell.rm('-rf', currentDir)
    // fs.mkdirSync(currentDir)
    fs.ensureDirSync(currentDir)

    await testCreate({ currentDir: `${currentDir}/prj1`, userChoosedDir })



})
/* ======================================== */
async function testCreate(args: { currentDir: string, userChoosedDir: string }) {
    console.log('user is initilizing its tsfr project...')
    fs.mkdirSync(args.currentDir)
    const { code } = shell.exec(`cd ${args.currentDir} && npx tsfr create ${args.userChoosedDir} --template todoList`)
    if (code != 0) throw 'failed'
    /* these will be made from scratch */
    expect(fs.existsSync(`${args.currentDir}/tsfr.config.json`)).toBeTruthy()
    /* these will get coppied from template folder */
    // expect(fs.existsSync(`${args.currentDir}/${args.userChoosedDir}/index.ts`)).toBeTruthy()

    expect(fs.readdirSync(`${args.currentDir}/${args.userChoosedDir}/`, {
        withFileTypes: true
    })).toMatchSnapshot('filesList')

}
/* ======================================== */
