import { 
    FrString,
    docExists, request, isString, isInt,
    getData, fieldsEqualTo, strBetween, getReq, str,
    getCurrentValues, FrBoolean,
} from "ts-firebase-rules"
import { _globalVariables_ } from "../_globalVariables_"
import * as mt from '../../modelsTypes'

export function list_todo(): FrBoolean {
    const currentValues = getCurrentValues<mt.read_todo>()
    return ( 
        request.auth != null && // user has logged in
        docExists<mt.T>(request.auth.uid, 'users') && // user exist
        currentValues.createdBy === request.auth.uid
    )

}
export function get_todo(id: FrString): FrBoolean {
    const currentValues = getCurrentValues<mt.read_todo>()
    return (
        docExists<mt.T>(id, 'todos') && // this todo hasnt been created already 
        docExists<mt.T>(request.auth.uid, 'users') && // user exist
        request.auth != null && // user has logged in
        currentValues.createdBy === request.auth.uid  
    )

} 
