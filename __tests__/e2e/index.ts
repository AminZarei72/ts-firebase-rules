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

    const currentDir_ = `./tmp/e2e1Files`
    const userChoosedDir = `tsfrPrj`
    /* ----------- */
    shell.rm('-rf', currentDir_)
    // fs.mkdirSync(currentDir)
    fs.ensureDirSync(`${currentDir_}/prj1`)
    /* ----------- */
    await installPackage({ currentDir: `${currentDir_}/prj1` })
    /* ----------- */
    await testCreate({ currentDir: `${currentDir_}/prj1`, userChoosedDir })
    await testBuild({ currentDir: `${currentDir_}/prj1`, userChoosedDir })

})
/* ======================================== */
async function testCreate(args: { currentDir: string, userChoosedDir: string }) {
    console.log('user is initilizing its tsfr project...')
    // fs.mkdirSync(args.currentDir)
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
async function testBuild(args: { currentDir: string, userChoosedDir: string }) {
    console.log('user is compiling its tsfr project...')
    const { code } = shell.exec(`cd ${args.currentDir} && npx tsfr build`)
    if (code != 0) throw 'failed'
    const defaultBuildName = 'firestore.rules'/* todo:Get this from tsfr.config.json */
    expect(fs.existsSync(`${args.currentDir}/${args.userChoosedDir}/build/${defaultBuildName}`)).toBeTruthy()
    expect(fs.readFileSync(`${args.currentDir}/${args.userChoosedDir}/build/${defaultBuildName}`)).toMatchSnapshot('finalBuild')
    /* these will be made from scratch */
    // expect(fs.existsSync(`${args.currentDir}/tsfr.config.json`)).toBeTruthy()
    // /* these will get coppied from template folder */
    // expect(fs.existsSync(`${args.currentDir}/${args.userChoosedDir}/index.ts`)).toBeTruthy()

}
/* ======================================== */
async function installPackage(args: { currentDir: string }) {
    shell.exec(`npm pack`)
    /* todo:make below npm Pack path based on current path */
    const { code } = shell.exec(`cd ${args.currentDir} && npm init -y && npm i -D  ../../../ts-firebase-rules-0.1.0.tgz`)
    if (code != 0) throw 'failed'
    // fs.createSymlinkSync('./node_modules', `${currentDir}/prj1/node_modules`, 'dir')
}
/* ======================================== */
