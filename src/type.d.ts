export type Nullish = undefined | null;
export type Primitive = string | number | bigint | boolean | symbol | Nullish;
export type Falsy = false | '' | 0 | 0n | Nullish;
export type DateLike = Date | number | string;
export type AnyFunc = (...args: any[]) => any;
export type AnyVoidFunc = (...args: any[]) => void;
export type VoidFunc = () => void;

/**
 * 选出对象中的可选属性的键，并使其成为联合类型
 * @see https://stackoverflow.com/questions/53899692/typescript-how-to-extract-only-the-optional-keys-from-a-type
 * @example
 * type MyType = {
 *   name: string;
 *   age?: number;
 *   email?: string;
 * }
 * type Keys = OptionalPropertyOf<MyType> = 'age' | 'email'
 */
export type OptionalPropertyOf<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]>
        ? never
        : K
}[keyof T], undefined>

/**
 * 挑出对象中的可选属性，并使其成为必选属性
 */
export type PickOptionalPropertyAndRequire<T extends object> = Required<Pick<T, OptionalPropertyOf<T>>>;

/**
 * 使函数返回值为 Promise
 */
export type PromisifyFunc<T extends AnyFunc> = (...args: Parameters<T>) => Promise<ReturnType<T>>;

/**
 * 取出 Promise 中的值
 */
export type UnPromisify<T> = T extends Promise<infer U> ? U : never;

/**
 * 对象的值类型
 */
export type ValueOf<T> = T[keyof T];

/**
 * 对象的键类型
 */
export type KeyOf<T> = keyof T;

/**
 * 按类型挑选值
 */
export type PickByValueType<T, K> = {
    [key in keyof T]: T[key] extends K ? T[key] : never;
}
