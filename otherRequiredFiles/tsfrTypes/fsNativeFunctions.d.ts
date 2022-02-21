/* ---------------------------------------- */
export const docExists: <tables>(id: FrStringAsParam, table: tables) => boolean
export const isString: (field: FrStringAsParam) => boolean /*  */

type fns =
    'create' |
    'update' |
    'get' |
    'delete' |
    'list' |
    'read' |
    'write';
type mainFns = { [targetPatsh in fns]: boolean; };
export type RuleStructure = () => {
    [
    /** e.g: 'x/y' will compile to match /x/y/ */
    targetPath: string
    ]: (id: any) => Partial<mainFns>
}
export const setRuleStructure: (ruleStructure: RuleStructure) => void
/* ---------------------------------------- */
export const request: FrRequest
export const resource: FrResource
/* ======================================================= */
export type data<D = { [x: string]: any }> = D
export type FrResource = {
    /* todo:sync these with exact functions from firebase  */
    // data:{ [x: string]: any},
    // data:any,
    // data2:Record<string, any> &{
    // data: any & {

    // somehow get this frm user
    data: data,
    // data: {
    //     size:()=>number,
    //     // keys:()=>string[],
    //     // keys:hasOnly,
    //     keys:any,
    //     diff:any,
    //     // ...string,
    // },
}
/* ---------------------------------------- */
/* ======================================================= */
type allTypes_string = MethodNames<String>
export type MethodNames<T> = T extends object
    ? {
        [K in keyof T]-?: T[K] extends () => any ? K : never;
    }[keyof T]
    : never;
export type FrStringMethods = {
    '': 'string'
    // _kind: 'String';
    matches: (pattern: FrStringAsParam) => boolean;
    lower: () => FrString;
    upper: () => FrString;
    trim: () => FrString;
    size: () => number;
    replace: (regex: FrStringAsParam, sub: FrStringAsParam) => FrString;
    split: (regex: FrStringAsParam) => Array<FrString>;
}

export type stringWithoutItsFns = Omit<Omit<string, allTypes_string>, 'length'>
export type FrString = stringWithoutItsFns & FrStringMethods
export type FrStringAsParam = FrString | string
/* ---------------------------------------- */
export type FrRequest = {
    resource: FrResource,
    path: FrString,
    /** The time variable contains a timestamp representing the current server time a request is being evaluated at. You can use this to provide time-based access to files, such as: only allowing files to be uploaded until a certain date, or only allowing files to be read up to an hour after they were uploaded. */
    time: any, /* todo:complete this (based on request.time)*/
    auth: {
        uid: FrString,
        token: {
            /** The email address associated with the account, if present.*/
            email: FrString,
            /** true if the user has verified they have access to the email address. Some providers automatically verify email addresses they own.*/
            email_verified: FrString,
            /** Firebase specific token properties.*/
            firebase: FrString,
            /** The user's display name, if set.*/
            name: FrString,
            /** The phone number associated with the account, if present.*/
            phone_number: FrString,
            /** The user's Firebase UID. This is unique within a project.*/
            sub: FrString,
        },
    }
}