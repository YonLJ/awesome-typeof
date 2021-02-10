import type { Nullish, Primitive, Falsy } from './type';

export const isNotEmptyString = (v: unknown): v is string => typeof v === 'string' && Boolean(v);

export const isNotEmptyArray = (v: unknown): v is unknown[] => Array.isArray(v) && Boolean(v.length);

export const isNotEmptySet = (v: unknown): v is Set<unknown> => v instanceof Set && Boolean(v.size);

export const isNotEmptyMap = (v: unknown): v is Map<unknown, unknown> => v instanceof Map && Boolean(v.size);

export const isNullish = (v: unknown): v is Nullish => v === undefined || v === null;

export const isPrimitive = (v: unknown): v is Primitive => v !== Object(v);

export const isFalsy = (v: unknown): v is Falsy => !v;

export const isRealNumber = (v: unknown): v is number => typeof v === 'number' && !Number.isNaN(v);

export const getValueByKey = <T extends object, K extends keyof T>(v: T, k: K): T[K] => v[k];
