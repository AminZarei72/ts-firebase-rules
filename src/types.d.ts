
/* ========================================== */
/* 
//Note:this is buggy on ts watch
 export type PackageJson = typeof import('../package.json')
  */
export type PackageJson = { version: string }
/* ========================================== */
