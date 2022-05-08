import { 
    FrString,
    docExists, request, isString, isInt,
    getData, fieldsEqualTo, strBetween, getReq, str, FrBoolean
} from "ts-firebase-rules"
import { titleIsValid } from "../helpers"
import { _globalVariables_ } from "../_globalVariables_"
import * as mt from '../../modelsTypes'

export function create_todo(id: FrString): FrBoolean {
    /* ---------------- */
    const reqData = getReq<mt.create_todo>()
    return (
        request.auth != null && // user has logged in
        docExists<mt.T>(request.auth.uid, 'users') && // user exist
        !docExists<mt.T>(id, 'todos') && // this todo hasnt been created already 
        fieldsEqualTo<mt.create_todo>([
            'title',
            'comments',
            'status',
            'createdBy',
        ]) &&
        titleIsValid(reqData.title) && //check title by regex
        reqData.status === str('waiting') &&
        isString(reqData.comments) &&
        reqData.createdBy === request.auth.uid 
    )

} 
