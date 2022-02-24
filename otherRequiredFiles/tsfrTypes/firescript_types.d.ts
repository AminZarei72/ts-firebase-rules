import { FrTimestamp, FrDuration, FrDiff, FrSet, SignInProvider, Token } from "./fs1";
import { MethodNames, PropertyNames, PropertyTypes } from "./tsTypeHelpers";
/* ======================================================= */
export type FrMap<T> =
    /*  T extends 'admin' ? T :  */ /* aaijsdnks */
    T extends string ? FrString :
    T extends Date ? FrTimestamp :
    // T extends number | boolean ? T :
    T extends number ? FrNumber :
    T extends boolean ? FrBoolean :
    T extends AnyFn ? never :
    T extends Array<infer V> ? FrArray<FrMap<V>> : /* kasndaksjdn */
    // T extends Array<infer V> ? any : /* kasndaksjdn */
    T extends object ? FrObject<T> :
    never;
// export type FrMap<T> = any

export type AnyFn = (...args: any[]) => any;
/* ======================================================= */
type allTypes_string = MethodNames<String>
export type FrStringMethods = {
    '': 'string'
    matches: (pattern: FrStringAsParam) => FrBoolean;
    lower: () => FrString;
    upper: () => FrString;
    trim: () => FrString;
    size: () => FrNumber;
    replace: (regex: FrStringAsParam, sub: FrStringAsParam) => FrString;
    split: (regex: FrStringAsParam) => FrArray<FrString>;
}

export type stringWithoutItsFns = Omit<Omit<string, allTypes_string>, 'length'>
export type FrString = stringWithoutItsFns & FrStringMethods
export type FrStringAsParam = FrString | string
/* ======================================================= */
type allTypes_number = MethodNames<Number>
export type FrNumberMethods = {
    '': 'number'
}
export type numberWithoutItsFns = Omit<number, allTypes_number>
// export type FrNumber = numberWithoutItsFns & FrNumberMethods
// export type FrNumber = number & FrNumberMethods
export type FrNumber = number
export type FrNumberAsParam = FrNumber | number
/* ======================================================= */


// interface BooleanConstructor {
//     // new(value?: any): Boolean;
//     // <T>(value?: T): boolean;
//     // readonly prototype: Boolean;
// }
//  declare var boolean: BooleanConstructor;


type allTypes_boolean = MethodNames<Boolean>
export type FrBooleanMethods = {
    '': 'boolean',
    // <T>(value?: T): boolean;
}
export type booleanWithoutItsFns = Omit<boolean, allTypes_boolean>
// export type FrBoolean = booleanWithoutItsFns & FrBooleanMethods /* ok */
// export type FrBoolean = typeof boolean
// export type FrBoolean = false | true /* ok */
// export type FrBoolean = boolean & FrBooleanMethods
export type FrBoolean = boolean
export type FrBooleanAsParam = FrBoolean | boolean
/* ======================================================= */


/* ======================================================= */
// export type FsArray<D> = Array<D> & {
//     // export  interface FsArray<D> extends Array<D> {
//     // intersection(objB: fb_array<any>):fb_array<D>,
//     /* todo:shouldnt these be fbObject instead of array */
//     intersection: (objB: FsArray<any>) => FsArray<D>,
//     difference: (objB: FsArray<any>) => FsArray<D>,
//     // difference(objB: fb_array<any>):fb_array<D>
//     size: () => number,
//     // hasAny: (arr: string[]) => boolean,
//     hasAny: (arr: (FsArray<FrString | FrNumber>) | (string | number[]) | FrString[]) => boolean,
//     toSet: () => FrObject<D>,
// }
/* ======================================================= */
// export  type FrObject<D> = { [x: string]: D }
export type FrObject<T> = {
    [K in keyof T]: FrMap<T[K]>;
} & {
    '': 'FrObject'
    keys: () => FrArray<FrMap<PropertyNames<T>>>;
    size: () => FrNumber;
    diff: (other: FrMap<T>) => FrDiff;
    values: () => FrArray<any>; // Don't know how to strongly-type this
    get: <X, U>(otherwise: X, path: (start: T) => U) => U | X;
}
/* ======================================================= */

export type ListParameter<T> = FrArray<T> | T[];

export type FrArray<T> = {
    '': 'FrArray'
    hasAny: (i: ListParameter<T>) => FrBoolean;
    hasOnly: (i: ListParameter<T>) => FrBoolean;
    hasAll: (i: ListParameter<T>) => FrBoolean;
    concat: (i: ListParameter<T>) => FrArray<T>;
    removeAll: (i: ListParameter<T>) => FrArray<T>;
    join: (separator: FrStringAsParam) => FrString;
    size: () => FrNumber;
    toSet: () => FrSet<T>;
} & { readonly [index: number]: T };
/* ======================================================= */
/* ======================================================= */
/* todo:we need to make a special object which also include .matches .size() .keys .diff ... */
/* ======================================================= */
// export  type myArr = Record<string, string> & {
//     matches?: string[]
//   };
/* ======================================================= */
/* todo:askdhijq3 */
// export  type fb_string = {
//     matches?: (string) => FrBoolean
// };

// size: () => number,
// toSet:() =>fb_object<D>,
// { [x: string]: any }
// /* ======================================================= */
// export  interface fb_object<D> extends Object<D> {
//     // size: () => number,
//     // toSet:() =>fb_object<D>,
//     // { [x: string]: any }
// }
/* -------------- */
// todo:try Symbol
// omit all but
/* todo[aksdjj2n3]:get String structure but not functions(or how to Omit all properties) */
// export  interface fb_string extends Omit<string, 'anchor'> {
// export  interface fb_string extends Omit<String, 'split'> {
// export  interface fb_string extends Omit<String, 'split'> {
//     /**Performs a regular expression match, returns true if the string matches the given regular expression. Uses Google RE2 syntax. */
//     matches: (regex: fb_string | string) => FrBoolean,
//     /**
//      * Returns the number of characters in the string.
//      * The number of items in the list.
//      * The number of keys in the map.
//     */
//     size: () => number,
//     /**Splits a string according to a provided regular expression and returns a list of strings. Uses Google RE2 syntax. */
//     split: (regex: fb_string) => fb_array<fb_string>,
// }
/* -------------- */
// export  interface fb_number extends number {
//     // matches: (arg: fb_string) => FrBoolean
// }

// matches: (arg: fb_string) => FrBoolean


/* ======================================================= */
// export  type data<D = create_group> =  {
// how to pass create_group dynamicly
// export type FsObjProperties = {
//     /* todo:there is much more here e.g see (request.resource.data.diff(resource.data).affectedKeys().hasOnly(allowToUpdatefieldsArr))
//           complete these based on actual documentions
//           */
//     /** Returns true if the desired key is present in the map or false if not present. */
//     in: (key: FrString) => FrBoolean
//     hasOnly: (key: FrString) => FrBoolean
//     /** A list of all keys in the map. */
//     keys: () => FsArray<FrString>, /* todo:need doulbe consideration (fb_array?).this need to be array of string of with none of js Array properties */
//     /** The number of items in the list. */
//     size: () => FrNumber,
//     /** A list of all values in the map, in key order. */
//     values: () => FsArray<any>, /* todo:need doulbe consideration (fb_array?) */
// }

export type data<D = { [x: string]: any }> = D
// export type data<D = { [x: string]: any }> = D & FsObjProperties
// export type FsTbl<D> = D & FsObjProperties
/* ======================================================= */
export type FrResource = {
    /* [d]todo:sync these with exact functions from firebase  */
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
/* ---------------------------------------- */
/* todo:change this because if user use an unknown fn there will be no err  */
type fns =
    'create' |
    'update' |
    'get' |
    'delete' |
    'list' |
    'read' |
    'write';
type mainFns = {
    // [targetPatsh in fns]: (id: FrString) => FrBoolean;
    [targetPatsh in fns]: FrBoolean;
};
export type RuleStructure = () => {
    [
    /**  users_private will compile to match /users_private/ */
    targetPath: string
    ]: (id: FrString) => Partial<mainFns>
}


/* =======================================
request:{
  "auth": {
    "uid": "my-unique-user-id-aka-uid",
    "token": {
      "some-custom-claim": true,
      "email": "user@email.com",
      "email_verified": false,
      "phone_number": null,
      "name": "My displayName",
      "sub": "my-unique-user-id-or-uid",
      "firebase": {
        "identities": {
          "google.com": ["first-google-uid", "second-google-uid"],
          "facebook.com": ["first-facebook-uid", "second-facebook-uid"]
        },
        "sign_in_provider": "facebook.com"
      }
    }
  },
  "path": Path,
  "query": {
    "limit": 10,
    "offset": "some-cursor-value",
    "groupBy": {
      "widgetType": true,
      "widgetName": false
    },
    "orderBy": {
      "widgetCreated": "ASC",
      "widgetName": "DESC"
    },
    "resource": Resource
  },
  "time": FrTimestamp,
  "writeFields": List
}
=======================================
data types
value is bool
value is int
value is float
value is number
value is string

value is list
value is map

value is timestamp
value is duration
value is path
value is latlng
  */