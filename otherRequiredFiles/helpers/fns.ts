
import {
    FrString, FrMap, FrObject, FrArray, FrSet,
    debug, request, resource, RuleStructure, FrBoolean, FrNumber, getData_, getDataAfter_
} from "../tsfrTypes"
// ==========================================================


// ==========================================================
/* export function bool(booleanValue: boolean): FrBoolean {
    return booleanValue as unknown as FrBoolean
} */
// ==========================================================
/* export function num(numberValue: number): FrNumber {
    return numberValue as unknown as FrNumber
} */
// ==========================================================
export function str(textValue: string): FrString {
    return textValue as unknown as FrString
}
// ==========================================================
export function getCurrentValues<T>(): FrMap<T> {
    // type Model = FrMap<T>;
    const reqData: FrMap<T> = resource.data as any
    return reqData
}
// // ==========================================================
// export function getCurrentValues_justForUpdates<T>(): FrMap<T> {
//     // type Model = FrMap<T>;
//     const reqData: FrMap<T> = request.resource.data as any
//     return reqData
// }
// ==========================================================
export function getReq<T>(): FrMap<T> {
    // type Model = FrMap<T>;
    const reqData: FrMap<T> = request.resource.data as any
    return reqData
}
// // ==========================================================
// export function getCurrentValues<T = any>(): FrMap<T> {

// /* this also works: const reqData=  <create_group &data >request.resource.data */
//     // const reqData = <T & data>request.resource.data
//     const reqData: FrMap<T> = <T & data>resource.data
//     return reqData

// }
// ==========================================================
// export  const getData: (tbl: string, id: fb_string) => any
export function getData<T, Tables>(tbl: Tables, id: FrString): FrMap<T> {

    /* this also works: const reqData=  <create_group &data >request.resource.data */
    // const reqData = <T & data>request.resource.data
    // const reqData =<T & data> getData(tbl, id)
    // const reqData = <T & FsObjProperties>getData(tbl, id)
    const reqData: FrMap<T> = getData_<Tables>(tbl, id)
    return reqData

}
// ==========================================================
// export  const getData: (tbl: string, id: fb_string) => any
export function getDataAfter<T, Tables>(tbl: Tables, id: FrString): FrMap<T> {

    /* this also works: const reqData=  <create_group &data >request.resource.data */
    // const reqData = <T & data>request.resource.data
    // const reqData =<T & data> getData(tbl, id)
    // const reqData = <T & FsObjProperties>getData(tbl, id)
    const reqData: FrMap<T> = getDataAfter_<Tables>(tbl, id)
    return reqData

}
// ==========================================================
// export function getVal(field: string) :boolean{
//     return request.resource.data[field]
// }
// ==========================================================
// export function getCurrentVal(field: string): any {

//     return resource.data[field]

// }
// -------------------------------------------------------

// -------------------------------------------------------
// export function thisDocBelongsToIt(docId){
//   return  request.auth.uid === docId;
// }
// -------------------------------------------------------

// -------------------------------------------------------
/* export function debug_(target: any): FrBoolean {
    return (
        debug('staaaaaaaaaaaaaaaaaaaart') !== null &&
        debug(target) !== null &&
        debug('ennnnnnnnnnnnnnnnnnnnnnd') !== null
    )

} */
// //-------------------------------------------------------
// export function getRole(){
//     return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role ;
// }
// -------------------------------------------------------
// export function allAdminPermissions(uid){
//   return
//     loggedIn() &&
//    thisDocBelongsToIt(uid) &&
//     uidRecordExistIn('users') &&
//    // todo:also exist groups table
//     getRole() =='admin'
//   ;
// }
// ==========================================================
// export function equalToRegex(field,regex){
//    return  request.resource.data[field].matches(regex) //  <   /^[0-9]+$/  >
// }

// -------------------------------------------------------
/* todo:just get the field itself here */
export function numBetween(field: string, start: number, end: number): FrBoolean {
    return (
        request.resource.data[field] >= start && request.resource.data[field] <= end
    )
}
// -------------------------------------------------------
export function strBetween(field: string, start: number, end: number): FrBoolean {
    return (
        request.resource.data[field].size() >= start && request.resource.data[field].size() <= end
    )
}
// -------------------------------------------------------
export function allowToUpdate(allowToUpdatefieldsArr: string[]): FrBoolean {
    /* note:check the docs before using this */
    return (
        request.resource.data.diff(resource.data).affectedKeys()
            .hasOnly(allowToUpdatefieldsArr)
    )
}
// -------------------------------------------------------
export function fieldsEqualTo(fieldsArr: string[]): FrBoolean {
    // note:this only works for creating for updating use allowToUpdate
    return (
        request.resource.data.keys().toSet() === (fieldsArr as any).toSet()
    )

}
// -------------------------------------------------------
export function include(item: any, targetArr: FrArray<any>): FrBoolean {
    // 'a' in ['a','b'].toSet() === true
    // return item in targetArr.toSet() === true
    return (item in targetArr.toSet())

}
// -------------------------------------------------------

export function toObj(targetArr: FrArray<any>): FrSet<any> {

    // ['a','b'].toSet()
    return targetArr.toSet()

}
// -------------------------------------------------------
export function getDiffItems(objA: FrSet<any>, objB: FrArray<any>): FrSet<any> {

    // ['a','b'].toSet().difference(['a','c'].toSet()) === ['b'].toSet()
    return objA.difference(objB.toSet())

}
// -------------------------------------------------------
export function getSharedItems(objA: FrSet<any>, objB: FrArray<any>): FrSet<any> {

    // ['a','b'].toSet().intersection(['a','c'].toSet()) === ['a'].toSet()
    return objA.intersection(objB.toSet())

}
// -------------------------------------------------------
/* export function getDiffItemsBk(objA: any, objB: FrArray<any>): FrObject<any> {

    // ['a','b'].toSet().difference(['a','c'].toSet()) === ['b'].toSet()
    return objA.difference(objB).toSet()

} */
// -------------------------------------------------------
/* export function getSharedItemsBk(objA: any, objB: FrArray<any>): FrObject<any> {

    // ['a','b'].toSet().intersection(['a','c'].toSet()) === ['a'].toSet()
    return objA.intersection(objB).toSet()

} */
