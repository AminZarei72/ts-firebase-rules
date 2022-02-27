import * as types from '../types';

/* ============================================================== */
export async function generate_tsconfig_forCompiling(args: {
    userMainIndexTs: string;
    additionalHelperFnsPath: string;
    userTypesPath: string;
    tsfr_config: types.Tsfr_config;
    additionalHelperTypesPath: string;
}) {
    const tsconfig_forCompiling = {
        "compilerOptions": {
            "target": "ESNext",
            "module": "amd",
            "strict": true,
            "noImplicitAny": true,
            "strictNullChecks": true,
            "strictFunctionTypes": true,
            "strictBindCallApply": true,
            "strictPropertyInitialization": true,
            "noImplicitThis": true,
            "alwaysStrict": true,
            "noImplicitReturns": true,
            "noFallthroughCasesInSwitch": true,
            "moduleResolution": "node",
            "removeComments": true,
            "allowUmdGlobalAccess": false,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true
        },
        "files": [
            args.userMainIndexTs,
        ],
        "include": [
            args.additionalHelperFnsPath,
            args.userTypesPath,
            args.additionalHelperTypesPath,
        ]
    };
    // const tsconfig_forCompilingPath = path.resolve(__dirname, configs.tsconfig_forCompilingPath) /* todo:can we get this from a config file? */
    // tsconfig_forCompiling.files =  /* #todo:this better be dynamic(rm resolve) */
    // tsconfig_forCompiling.include = [includedTypesPath]
    /* tsconfig_forCompiling.outFile = compiledTsPath */
    // tsconfig_forCompiling.include = [
    //     args.userCurrentPath + '/' + args.tsfr_config.mainDir + '/**/*.d.ts',
    //     args.additionalHelperTypesPath,
    // ]
    return tsconfig_forCompiling;
}
