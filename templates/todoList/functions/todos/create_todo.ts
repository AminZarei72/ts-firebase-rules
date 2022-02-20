import {
    FrString,
    request
}
    from "ts-firebase-rules"
// from '../../../../tmp/e2e1Files/prj1/node_modules/ts-firebase-rules'

import { _globalVariables_ } from "../_globalVariables_"

/* if we rm FrBoolean here(and bool()) it always will be False! */
export function create_todo(id: FrString): boolean {

    /* ---------------- */
    return (
        request.auth != null && // user has logged in

        //todo:check title by regex

        true
    )

} 
