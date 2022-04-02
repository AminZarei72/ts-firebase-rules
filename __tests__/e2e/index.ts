import shell from 'shelljs'
import * as fs from 'fs-extra'
// import * as configs from '../../src/configs'
/* ======================================== */
test('"create" works', async () => {
    expect(1 + 2).toBe(3)

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
    await installPackage({ currentDir: `${currentDir_}/prj1`, userChoosedDir })

    /* ----------- */
    await testCreate({ currentDir: `${currentDir_}/prj1`, userChoosedDir })
    await testBuild({ currentDir: `${currentDir_}/prj1`, userChoosedDir })

})
/* ======================================== */
async function testCreate(args: { currentDir: string, userChoosedDir: string }) {
    console.log('user is initilizing its tsfr project...')
    // fs.mkdirSync(args.currentDir)
    /*  const { code } = shell.exec(`cd ${args.currentDir} && npx tsfr create ${args.userChoosedDir} --template todoList`) */
    const res1 = shell.exec(`cd ${args.currentDir} && npm run tsfr:create`)
    expect(res1.code).toBe(0)
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
    /* const { code } = shell.exec(`cd ${args.currentDir} && npx tsfr build`) */
    const res1 = shell.exec(`cd ${args.currentDir} && npm run tsfr:build`)
    expect(res1.code).toBe(0)
    const defaultBuildName = 'firestore.rules'/* todo:Get this from tsfr.config.json */
    expect(fs.existsSync(`${args.currentDir}/${args.userChoosedDir}/build/${defaultBuildName}`)).toBeTruthy()
    expect(fs.readFileSync(`${args.currentDir}/${args.userChoosedDir}/build/${defaultBuildName}`)).toMatchSnapshot('finalBuild')
    /* these will be made from scratch */
    // expect(fs.existsSync(`${args.currentDir}/tsfr.config.json`)).toBeTruthy()
    // /* these will get coppied from template folder */
    // expect(fs.existsSync(`${args.currentDir}/${args.userChoosedDir}/index.ts`)).toBeTruthy()

}
/* ======================================== */
async function installPackage(args: { currentDir: string, userChoosedDir: string }) {
    const res1 = shell.exec(`npm pack`)
    // if (res1 != 0) throw 'failed'
    expect(res1.code).toBe(0)
    const asd = res1.stdout.split('\n')
    const packageName = asd[asd.length - 2]
    // console.log(11111, )
    /* todo:make below npm Pack path based on current path */
    /* todo:automaticly find the package name */
    const res2 = shell.exec(`cd ${args.currentDir} && npm init -y && npm i -D  ../../../` + packageName)
    expect(res2.code).toBe(0)
    const oldPkj = fs.readJsonSync(`${args.currentDir}/package.json`)
    fs.writeJsonSync(`${args.currentDir}/package.json`, {
        // "asd":"tsfr",
        ...oldPkj,
        "scripts": {
            "tsfr:create": "tsfr create " + args.userChoosedDir + " --template todoList",
            "tsfr:build": "tsfr build"
        }
    })


    // const res = shell.exec('cd ${args.currentDir} && npm run runTsfr')
    // console.log(res)
    // // if (code != 0) throw 'failed'
    // expect(res.stdout.includes(configs.appName)).toBeTruthy()

    // fs.createSymlinkSync('./node_modules', `${currentDir}/prj1/node_modules`, 'dir')
}
/* ======================================== */
