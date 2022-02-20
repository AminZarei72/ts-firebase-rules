import {
    FrString,
    request,
    docExists,
    fieldsEqualTo
}
    from "ts-firebase-rules"
// from '../../../../tmp/e2e1Files/prj1/node_modules/ts-firebase-rules'
import * as mt from '../../modelsTypes'

import { _globalVariables_ } from "../_globalVariables_"

export function create_todo(id: FrString): boolean {

    /* ---------------- */
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
        false
    )

} 
