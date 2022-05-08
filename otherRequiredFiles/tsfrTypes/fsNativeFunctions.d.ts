/* ---------------------------------------- */
// import { tables } from '../modelsTypes'
import { FrStringAsParam, FrRequest, FrNumber, FrResource, RuleStructure, FrBoolean, FrNumberAsParam, FrBooleanAsParam } from './firescript_types'
import { FrDuration, FrTimestamp, } from './fs1.d'
/* ---------------------------------------- */
export const setRuleStructure: (ruleStructure: RuleStructure) => void
/* ---------------------------------------- */
export const request: FrRequest
export const resource: FrResource
/* ---------------------------------------- */
// export const isBool: (field: boolean) => boolean
// export const isInt: (field: FrNumber) => boolean
// export const isString: (field: FrStringAsParam) => boolean
export const isBool: (field: FrBooleanAsParam) => FrBoolean
export const isInt: (field: FrNumberAsParam) => FrBoolean
export const isString: (field: FrStringAsParam) => FrBoolean
export const isFloat: (field: FrNumberAsParam) => FrBoolean
export const isNumber: (field: FrBooleanAsParam) => FrBoolean
/* ---------------------------------------- */
/* akjsdkjqnw:  */
export const docExists: <tables>(id: FrStringAsParam, table: tables) => FrBoolean
export const docExistsAfter: <tables>(id: FrStringAsParam, table: tables) => FrBoolean
export const getData_: <tables>(tbl: tables, id: FrStringAsParam) => any
export const getDataAfter_: <tables>(tbl: tables, id: FrStringAsParam) => any

// export const getAfter_users_public: (id: FrStringAsParam) => any
// export  const getGroup: (id: fb_string) => any
export const uidRecordExistIn: (id: FrStringAsParam) => FrBoolean
// export const get_users_private: (id: FrStringAsParam) => any
// export  const get_users_public: (id: fb_string) => any
// export  const isBool: (field: any) => FrBoolean
// export  const isInt: (field: any) => FrBoolean
// export  const isString: (field: any) => FrBoolean
export function debug(item: any): FrBoolean
// export function debug<T>(value: T): T;
/* ======================================================= */

export function int<T extends FrStringAsParam | FrNumberAsParam>(value: T): FrNumber;
export function float<T extends FrStringAsParam | FrNumberAsParam>(value: T): FrNumber;

// export function debug<T>(value: T): T;

// export function get<DATA>(path: string): Resource<DATA> | undefined;
// export function exists(path: string): boolean;

export namespace math {
    function abs(n: FrNumberAsParam): FrNumber;
    function ceil(n: FrNumberAsParam): FrNumber;
    function floor(n: FrNumberAsParam): FrNumber;
    function round(n: FrNumberAsParam): FrNumber;
    function sqrt(n: FrNumberAsParam): FrNumber;
    function isInfinite(n: FrNumberAsParam): FrBoolean;
    function isNaN(n: FrNumberAsParam): FrBoolean;
    function pow(base: FrNumberAsParam, exponent: FrNumberAsParam): FrBoolean;
}

export namespace timestamp {
    function value(epochMillis: FrNumberAsParam): FrTimestamp;
    function date(year: FrNumberAsParam, month: FrNumberAsParam, day: FrNumberAsParam): FrTimestamp;
}

export namespace duration {
    function abs(d: FrDuration): FrDuration
    function value(n: FrNumberAsParam, unit: 'w' | 'd' | 'h' | 'm' | 's' | 'ms' | 'ns'): FrDuration
    function time(
        hours: FrNumberAsParam,
        mins: FrNumberAsParam,
        secs: FrNumberAsParam,
        nanos: FrNumberAsParam
    ): FrDuration
} 