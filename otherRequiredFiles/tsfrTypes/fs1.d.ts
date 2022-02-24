import { FrBoolean, FrNumber } from ".";
import {
    FrStringAsParam, FrMap, FrString, ListParameter
} from "./firescript_types";
// import { FrString } from "./tsTypeHelpers";



export interface FrDiff {
    '': 'FrDiff';
    addedKeys: () => FrSet<FrString>;
    affectedKeys: () => FrSet<FrString>;
    changedKeys: () => FrSet<FrString>;
    removedKeys: () => FrSet<FrString>;
    unchangedKeys: () => FrSet<FrString>;
}

export interface FrSet<T> {
    '': 'FrSet';
    size: () => FrNumber;
    hasAny: (s: FrSet<T> | ListParameter<T>) => FrBoolean;
    hasOnly: (s: FrSet<T> | ListParameter<T>) => FrBoolean;
    hasAll: (s: FrSet<T> | ListParameter<T>) => FrBoolean;
    intersection: (s: FrSet<T>) => FrSet<T>;
    difference: (s: FrSet<T>) => FrSet<T>;
    union: (s: FrSet<T>) => FrSet<T>;
}



// export type ReadRequest = 'get' | 'list';
// export type WriteRequest = 'create' | 'update' | 'delete';
// export type AnyRequestKind = ReadRequest | WriteRequest;

export type SignInProvider =
    | 'custom'
    | 'google.com'
    | 'twitter.com'
    | 'facebook.com'
    | 'anonymous'
    | 'password'
    | 'phone'
    | 'github.com'
    ;
// export type Auth<CLAIMS> = FrMap<{
//     uid: FrString;
//     token: Token & CLAIMS;
// }>;

/* todo:check if this exist on real fb properties */
export interface Token {
    name?: FrString;
    email?: FrString;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    email_verified: FrBoolean;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    firebase: { sign_in_provider: SignInProvider };
}



export interface FrTimestamp {
    '': 'FrTimestamp';
    year(): FrNumber;
    date(): FrTimestamp;
    hours(): FrNumber;
    minutes(): FrNumber;
    seconds(): FrNumber;
    nanos(): FrNumber;
    time(): FrDuration;
    month(): FrNumber;
    day(): FrNumber;
    toMillis(): FrNumber;
}

export interface FrDuration {
    '': 'FrDuration';
    nanos(): FrNumber;
    seconds(): FrNumber;
}