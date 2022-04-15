/* import { 
    FrString, FrMap, FrObject, FrArray, FrSet, 
    debug, request, resource, getData,
 } from "ts-firebase-rules"

 */
import {
    FrString, FrStringAsParam,
    FrBoolean, docExists
} from "ts-firebase-rules";
import * as mt from "../modelsTypes";
import { _globalVariables_ } from "./_globalVariables_";


export function titleIsValid(title: FrString): FrBoolean {
    return (
        title.matches('[A-Za-z][A-Za-z0-9]*') &&
        title.size() >= _globalVariables_.minimumCharsInTitle &&
        title.size() <= _globalVariables_.maximumCharsInTitle)

} 