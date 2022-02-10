
/* ========================================== */
/* 
//Note:this is buggy on ts watch
 export type PackageJson = typeof import('../package.json')
  */
export type PackageJson = { version: string }
export type Tsfr_config = {
  tsfr_config_fileName: string,
  mainDir: string,
  userMainIndexTs: string,
  /* [d]todo:complete this */
  nativeFilesPath: string,
  outputFilePath: string,
  targetDotRulesPath: string,
}
/* ========================================== */
