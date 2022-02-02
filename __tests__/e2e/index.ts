import shell from 'shelljs'
import * as fs from 'fs-extra'
import * as configs from '../../src/configs'
/* ======================================== */
test('"create" works', async () => {
    expect(1 + 2).toBe(3)
    const res = shell.exec('npx tsfr') 
    expect(res.stdout.includes(configs.appName)).toBeTruthy()
})
