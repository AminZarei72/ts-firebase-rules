// ==========================================================

import { request, FrMap, FrString } from "../tsfrTypes"

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
// export function getReq<T>(): any { /* todo:get T and return our types instead */
//     // type Model =  any;
//     const reqData: any = request.resource.data as any
//     return reqData
// }
// ==========================================================
export function getReq<T>(): FrMap<T> {
    // type Model = FrMap<T>;
    const reqData: FrMap<T> = request.resource.data as any
    return reqData
}
// ==========================================================
export function str(textValue: string): FrString {
    return textValue as unknown as FrString
}
// ==========================================================
