import {
    FrString,
    request,
    docExists,
    fieldsEqualTo,
    getReq,
    isString,
}
    from "ts-firebase-rules"
    // from '../../../../tmp/e2e1Files/prj1/node_modules/ts-firebase-rules'
import * as mt from '../../modelsTypes'

import { _globalVariables_ } from "../_globalVariables_"

export function create_todo(id: FrString): boolean {

    /* ---------------- */
    const reqData = getReq<mt.create_todo>()

    return (
        request.auth != null && // user has logged in
        //todo:check title by regex
        docExists<mt.T>(request.auth.uid, 'users') && // user exist
        !docExists<mt.T>(id, 'todos') && // this todo hasnt been created already 
        fieldsEqualTo([
            'status',
            'title',
            'comments',
            'createdBy',
        ]) &&

        reqData.createdBy === request.auth.uid &&
        // reqData.status === 'waiting' && //todo:this is buggy
        isString(reqData.comments) &&

        false
    )

} 
