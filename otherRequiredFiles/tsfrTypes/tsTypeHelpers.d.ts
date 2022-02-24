import { AnyFn } from "./firescript_types";
export type MethodNames<T> = T extends object
    ? {
        [K in keyof T]-?: T[K] extends AnyFn ? K : never;
    }[keyof T]
    : never;
/* ======================================= */
export type PropertyNames<T> = T extends object
    ? {
        [K in keyof T]-?: T[K] extends AnyFn ? never : K;
    }[keyof T]
    : never;
/* ======================================= */
export type PropertyTypes<
    T extends Record<string, unknown>,
    MODE extends 'deep' | 'shallow'
    > = Exclude<PropertyTypesCore<T, MODE>, AnyFn>;
/* ======================================= */
export type PropertyTypesCore<
    T extends Record<string, unknown>,
    MODE extends 'deep' | 'shallow'
    > = {
        [KEY in keyof T & (string | number)]:
        | T[KEY]
        | (MODE extends 'deep'
            ? T[KEY] extends Record<string, unknown>
            ? PropertyTypesCore<T[KEY], 'deep'>
            : never
            : never);
    }[keyof T & (string | number)];
/* ======================================= */
