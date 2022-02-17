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
        new_fileContent = rm_globalVariable_(new_fileContent)
        new_fileContent = modify_ruleStructure(new_fileContent)

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
export function modify_ruleStructure(fileContent: string): string {
    let new_fileContent = fileContent
    // const ruleStructureString='_ruleStructure___'
    // const ruleStructureString='_ruleStructure_'
    // const ruleStructureString = 'setRuleStructure(() => ({'
    if (!fileContent.includes('setRuleStructure')) return fileContent /* kjasdijn3 */
    /* --------------- */
    // /(exports\.ruleStructure \= \{)/,
    const asd = regexConcater([
        // 'let _ruleStructure_ = () => ({});',
        // 'let ruleStructureString = () => ({',
        'setRuleStructure(() => ({',
        /(?<content>((.|\n)*))/,
        '}));',
        // /\}\);/,
    ], '')
    // console.log(fileContent)
    const ruleStructure = fileContent.match(asd)
    // console.log(ruleStructure)
    if (!ruleStructure) { /* this is useless(kjasdijn3) */
        return err('couldnt find ruleStructure');
    }
    // console.log({ n: ruleStructure[0] });
    // if (!ruleStructure.groups['body']) return err('couldnt find "body"')
    if (!ruleStructure.groups || !ruleStructure.groups['content']) {
        console.warn('skiping ruleStructure since there was no "ruleStructure" fn');
        return new_fileContent
    };
    /* ------------------------- */

    // const tmp2 = [
    //     // /(\s)'(?<cls>((.)+))':/,
    //     // // /\s\((?<param>((.)*))\)/,//id
    //     // // // /((.|\n)*)/,
    //     // // /\s=>\s\(\{\n/,
    //     // /(?<fns>((.|\n)*))/,//groups
    //     // '})',
    //     // /\}\)(\,?)\n/
    //     /\}\)/
    // ]
    const clss = ruleStructure.groups['content'].split('})')
    clss.splice(clss.length - 1, 1)
    // console.log(1111, clss)
    /* add a loop here */
    // const fns = ruleStructure.groups['content'].split(',').filter(i => i != '')
    // console.log(11111,fns)

    // console.log(222222221, fns[0].match(regexConcater(tmp2, '')))
    // .match()
    /* ------------------------- */
    /* todo:user_public_1. didnt get remove! */
    /*  create: x.create_x(id) */
    const tmp3 = [
        /(\s*)'(?<cls>((.)+))':/,
        /\s\((?<param>((.)*))\)/,//id
        // /((.|\n)*)/,
        /\s=>\s\(\{\n/,
        /(?<fns>((.|\n)*))/,//groups
        // '}),',
    ]
    let azxcas = ''
    clss.map(currentCls => {
        const foundCls = currentCls.match(regexConcater(tmp3))
        if (!foundCls || !foundCls.groups) {
            return err('couldnt find ruleStructure functions!');
        }
        if (!foundCls.groups['cls'])
            return err('couldnt find "cls"');
        // if (!asd.groups['param']) return err()
        if (!foundCls.groups['fns'])
            return err('couldnt find "fns"');

        const targetPath = foundCls.groups['cls'];
        const param = foundCls.groups['param'] ? `/{${foundCls.groups['param']}}` : ''; /* this is optional so specific chars appear when its there */
        const fns = foundCls.groups['fns'].split('\n');/* todo:what if user dont use NewLine? */
        // console.log({ fns })
        /* const keyVal_fns = fns.map(i => i.split(': () => ')); */
        const keyVal_fns = fns.map(i => i.split(': '));
        keyVal_fns.splice(keyVal_fns.length - 1, 1);
        const finalFns = keyVal_fns.map(i => '\n\t\t allow ' + i[0].trim() + ': if ' + i[1].trim().split(',').join('') + ';').join('');

        // ${asd.groups['']}
        azxcas += (`
        match /${targetPath}${param} {
            ${finalFns}
        }\n
        `)
    })
    new_fileContent = new_fileContent.replace(asd, azxcas)
    /* --------------- */
    return new_fileContent
}
/* ================================= */
/* ================================= */
export function rm_globalVariable_(fileContent: string): string {
    let new_fileContent = fileContent
    /* todo.opt:test with double globalVariable_ */
    /* todo use match technique here */
    /* --------------- */
    /* add these to testing(with below regex ,it must returns all variables) :
     _globalVariables_.minimumCharsInTitle = 6;
        _globalVariables_.maximumCharsInTitle = 20;
        _globalVariables_.maximumChar_sInTsitle = 20;
        _globalVariables_._maxim23asd23ra$umChar_$sInTsitle = 20;
        _globalVariables_.$maximumChar_$sInTsi23tle = 20;
        _globalVariables_.asdasd = _globalVariables_.minimumCharsInTitle +
            _globalVariables_.minimumCharsInTitle;
        _globalVariables_.asdasd = '_globalVariables_.minimumCharsInTitle' ^
            '_globalVariables_.minimumCharsInTitle' ;
        _globalVariables_.asdasds = _globalVariables_.minimumCharsInTitle - _globalVariables_.minimumCharsInTitle;

        _globalVariables_1._globalVariables_.maximumCharsInTitle); 
        */
    /* convert global vars to global fn  minimumCharsInTitle = 6 ==> function minimumCharsInTitle(){return 6} */
    // const aValidVariable = /(([A-Za-z\$_])([A-Za-z\$_0-9]+))/
    const aValidVariable = /(?<fname>(([A-Za-z\$_])([A-Za-z\$_0-9]+)))/
    // const aValidValue = /(?<value>(([A-Za-z\$_0-9\"\']+)))/
    new_fileContent = new_fileContent.replace(regexConcater([
        /(\s)_globalVariables_\./,
        aValidVariable,
        /(\s)=(\s)/,
        /(?<val>((.|([\+\-\*%\^]\n))+));/, /* new line allowed when another operator comes before it */
    ], 'gm'),
        'function $<fname>(){ return $<val> ; }\n'
    );
    // (\s)_globalVariables_\.(?<fname>(([A-Za-z\$_])([A-Za-z\$_0-9]+)))(\s)=(\s)(?<val>((.|([\+\-\*%\^]\n))+));
    /*
    (\s)_globalVariables_\.(?<fname>(([A-Za-z\$_])([A-Za-z\$_0-9]+)))(\s)=(\s)(?<val>((.|(\+\n))+));
     */
    /* (\s)_globalVariables_\.(?<fname>(([A-Za-z\$_])([A-Za-z\$_0-9]+)))(\s)=(\s)(?<val>((.|([\+\-\*%\^]\n))+));
     */
    /* --------------- */
    /* --------------- */
    /* convert _globalVariables_.x to x() */
    /* todo:test this with /gm */
    /* todo:rm s */
    // new_fileContent = new_fileContent.replace(/(_globalVariables_\.)(?<fname>(.*?))(\s)/g, ' $<fname>\(\) ');
    new_fileContent = new_fileContent.replace(regexConcater([
        /(\s)(_globalVariables_\.)/,
        aValidVariable,
    ], 'gm'),
        ' $<fname>\(\) '
    );
    /* --------------- */
    // /* todo:in best senario  these must work in isolated env and without needing tothether */
    // /* even if user dont export it this still convert it */
    // /* todo:this must be scoped  */
    // /* rm useless */
    // /* note:dont add gm to this one (there must be just one) */
    new_fileContent = new_fileContent.replace(/(\s)let(\s)_globalVariables_;/m, '\n');
    new_fileContent = new_fileContent.replace(/(\s)\(function(\s)\(_globalVariables_\)(\s)\{\n/m, '\n');
    new_fileContent = new_fileContent.replace(/\}\)\(_globalVariables_(?<fname>(.*?))\n/m, '\n');
    // /* convert global vars to global fn */
    // new_fileContent = new_fileContent.replace(/(\s)_globalVariables_\.(?<fname>(.*))(\s)=(\s)(?<val>(.*));\n/gm, 'function $<fname>(){ return $<val> ; }\n');
    // new_fileContent = new_fileContent.replace(/(\s)(_globalVariables_\.)(?<fname>(.*?))(\s)/g, ' $<fname>\(\) ');

    return new_fileContent
}
/* ================================= */
