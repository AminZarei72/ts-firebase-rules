/* ================================= */
import { err, regexConcater, } from './helpersFns'
/* ================================= */
/* '&&', '.', '==', '>', '>=', '[', '<', '<=', '-', '%', '!=', '||', '+', ';', '/', '*', '?', 'in', 'is'} */
/*  fns getReq() with no space will have conflict with  asdasdfns getReq() */
/* using prettier can actually help to save spaces... */
/* ================================= */
export function compileTheCompiledTs(compiledTs: string): string {
    /* --------------- */
    const files = getFiles(compiledTs)
    if (!files || files.length == 0) return ''
    const newFiles: string[] = [];

    files.map(file => {
        let new_fileContent = ''
        new_fileContent = rmImportedModules(file)
        new_fileContent = modify1(new_fileContent)
        new_fileContent = rmUselessStrings(new_fileContent)
        // new_fileContent = file.content
        newFiles.push(new_fileContent)
    })
    // console.log(files)
    /* --------------- */
    return newFiles.join('')
}
/* ================================= */
/* ================================= */
export function getFiles(compiledTs: string): ({ content: string, importedModules: string[], }[]) | false {
    /*^(define\(")(?<p1>(.*))",\s\["require",\s"exports"(?<p2>(.*))\],\sfunction\s\(require,\sexport(?<p3>(.*))\)\s\{\n(?<content>((.|\n)*?))^(\}\);\n) */
    /*\n(define\(")(?<p1>(.*))",\s\["require",\s"exports"(?<p2>(.*))\],\sfunction\s\(require,\sexport(?<p3>(.*))\)\s\{\n(?<content>((.|\n)*?))\n(\}\);\n) */
    /* todo:scape all {} */
    /* todo:but what if there was an unexpected output! like different "define" structure  */
    /* note:if we use /g ,we cant use groups */
    /* note:^(at start the line) is buggy ,for example we could find "^define" easily on vscode finder but it couldnt in  imported file inside with node fs*/
    // console.log('aaaaaaaaa', compiledTs)
    // const files = compiledTs.match(
    //     // new RegExp('\n(define\(")(?<p1>(.*))",\s\["require",\s"exports"(?<p2>(.*))\],\sfunction\s\(require,\sexport(?<p3>(.*))\)\s\{\n(?<content>((.|\n)*?))^(\}\);\n)', 'gs')
    //     /\n(define\(")(?<p1>(.*))",\s\["require",\s"exports"(?<p2>(.*))\],\sfunction\s\(require,\sexport(?<p3>(.*))\)\s\{\n(?<content>((.|\n)*?))\n(\}\);\n)/g
    // )
    const asd = [
        /(define\(")/,
        /(?<p1>(.*))/,
        /",\s\["require",\s"exports"/,
        /(?<p2>(.*))/,
        /\],\sfunction\s\(require,\sexports/,
        /(?<importedModules>(.*))/,
        /\)\s\{\n/,
        /(?<content>((.|\n)*?))/,
        /\n((\}\);))/,
    ]
    const files = compiledTs.match(regexConcater(asd, 'g'))
    // console.log(files)
    console.log('founded files:', files?.length)
    const finalResult = []
    if (files) {
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            const file = files[fileIndex];
            const found = file.match(regexConcater(asd, ''))
            /* todo:add file address here */
            if (!found || !found.groups) {
                err('')
                return false /* note:this will never fires(this is tmp ,just for type matching) */
            }
            const content = found.groups['content']
            /* content could be empty */
            const importedModules = found.groups['importedModules']

            const final_importedModules: string[] = []
            if (importedModules && importedModules != '') {
                const tmp = importedModules.split(',')
                if (tmp.length > 0) {
                    tmp.splice(0, 1)
                    tmp.map(i => final_importedModules.push(i.trim()))
                    // =tmp
                }
            }
            // console.log({ fileIndex, importedModules, content })
            finalResult.push({ content, importedModules: final_importedModules, })
        }
        // files['input'] = ''
        // console.log(files.groups)
        // console.log(files.length)
    }
    return finalResult


}
/* ================================= */
/* ================================= */
/** Note:this is still unstable and might change  */
export function rmImportedModules(file: { content: string, importedModules: string[], }): string {
    let fileContent = file.content
    file.importedModules.map(mdl => {
        // const tmp = ' ' + mdl + '.'
        const tmp = ' ' + mdl + '.'
        const tmp2 = '(' + mdl + '.'
        const tmp3 = '[' + mdl + '.'
        const tmp4 = '!' + mdl + '.'
        /* todo:use regex here */
        // console.log(tmp)
        // console.log(tmp.split(''))
        // const files = fileContent.match(regexConcater([tmp], 'gm'))
        // fileContent = fileContent.replace(regexConcater([tmp], 'gm'), ' ')
        fileContent = fileContent.split(tmp).join(' ');
        fileContent = fileContent.split(tmp2).join('(');
        fileContent = fileContent.split(tmp3).join('[');
        fileContent = fileContent.split(tmp4).join('!');
        // fileContent = fileContent.replace(importedModule.trim() + '.', '')
    })
    // return file.content
    return fileContent
}
/* ================================= */
/* ================================= */
export function modify1(fileContent: string): string {
    let new_fileContent = fileContent
    /* --------------- */
    // new_fileContent = new_fileContent.replace(/define\("(.*?)\)(\s)\{\n/gm, '');
    // new_fileContent = new_fileContent.replace(/^\}\);\n/gm, '');
    /* --------------- */
    new_fileContent = new_fileContent.replace(/(\s)const(\s)/gm, ' let ');
    new_fileContent = new_fileContent.replace(/(\s)var(\s)/gm, ' let ');
    /* --------------- */
    /* todo:do we really need these? */
    new_fileContent = new_fileContent.replace(/(\s)===(\s)/gm, ' == ');
    new_fileContent = new_fileContent.replace(/(\s)!==(\s)/gm, ' != ');
    /* --------------- */
    return new_fileContent
}
/* ================================= */
export function rmUselessStrings(fileContent: string): string {
    let new_fileContent = fileContent
    /* --------------- */
    new_fileContent = new_fileContent.replace(/Object\.defineProperty(.*?);/gm, '\n');
    new_fileContent = new_fileContent.replace(/"use strict";/gm, '\n');
    new_fileContent = new_fileContent.replace(/__exportStar(.*?);/gm, '\n');
    /* todo:this export could be buggy(conflict with other) ,check it carefully */
    new_fileContent = new_fileContent.replace(/exports\.(.*);/gm, '\n');
    /* --------------- */
    return new_fileContent
}
/* ================================= */
