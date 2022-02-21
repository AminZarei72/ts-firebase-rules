// ==========================================================

import { request } from "../tsfrTypes"

/* todo:add some useful function here */
export function example(params: string): boolean {
    return true
}
export function fieldsEqualTo(fieldsArr: string[]): boolean {
    return (
        request.resource.data.keys().toSet() === (fieldsArr as any).toSet()
    )

}

// ==========================================================
export function getReq<T>(): any { /* todo:get T and return our types instead */
    // type Model =  any;
    const reqData: any = request.resource.data as any
    return reqData
}