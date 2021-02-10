# awesome-typeof

[![NPM Version](https://img.shields.io/npm/v/awesome-typeof.svg?style=flat-square)](https://www.npmjs.com/package/awesome-typeof)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dt/awesome-typeof.svg?style=flat-square)](https://www.npmjs.com/package/awesome-typeof)

Detect JavaScript variable type with enhanced type checking and full TypeScript support.

## Install

```sh
npm i awesome-typeof --save
```

## TypeScript Support

This package includes comprehensive TypeScript type definitions (`type.d.ts`) that provide:

### Basic Types
- `Primitive`: string | number | bigint | boolean | symbol | null | undefined
- `Falsy`: false | "" | 0 | 0n | null | undefined
- `Nullish`: null | undefined
- `AnyFunc`: (...args: any[]) => any
- `AnyVoidFunc`: (...args: any[]) => void
- `VoidFunc`: () => void

### Advanced Type Utilities
- `OptionalPropertyOf<T>`: Extract optional keys from an object type
- `PickOptionalPropertyAndRequire<T>`: Make optional properties required
- `PromisifyFunc<T>`: Convert function return type to Promise
- `UnPromisify<T>`: Extract type from Promise
- `ValueOf<T>`: Get value type from object type
- `KeyOf<T>`: Get key type from object type
- `PickByValueType<T, K>`: Pick properties by value type

```typescript
import { v1 as typeOf, v2 as detailedTypeOf } from 'awesome-typeof';
import type { 
  Primitive, Falsy, AnyFunc,
  OptionalPropertyOf, PromisifyFunc
} from 'awesome-typeof';

// Using type aliases
const strType = typeOf("hello"); // "string"
const arrType = detailedTypeOf([]); // "Array"

// Using utility types
type User = {
  name: string;
  age?: number;
  email?: string;
};
type OptionalKeys = OptionalPropertyOf<User>; // "age" | "email"

// Promisify a function
type SyncFunc = (a: number) => string;
type AsyncFunc = PromisifyFunc<SyncFunc>; // (a: number) => Promise<string>
```

## Core Functions

### typeOf (v1 alias) - Simple Type Detection
Returns basic JavaScript types ('string', 'number', 'boolean', etc.)

```javascript
import { v1 as typeOf } from 'awesome-typeof';

typeOf([]);        // => "object"
typeOf(123);       // => "number"
typeOf(null);      // => "null"
typeOf(undefined); // => "undefined"
typeOf(true);      // => "boolean"
```

### detailedTypeOf (v2 alias) - Detailed Type Detection
Returns constructor names for objects

```javascript
import { v2 as detailedTypeOf } from 'awesome-typeof';

detailedTypeOf([]);           // => "Array"
detailedTypeOf(new Set());    // => "Set"
detailedTypeOf(null);         // => "null"
detailedTypeOf(() => {});     // => "Function"
detailedTypeOf(Promise.resolve()); // => "Promise"
```

## Utility Functions

### Type Guards
```javascript
import {
  isNotEmptyString, isNotEmptyArray,
  isNotEmptySet, isNotEmptyMap,
  isNullish, isPrimitive, isFalsy,
  isRealNumber
} from 'awesome-typeof';

isNotEmptyString(""); // false
isNotEmptyString("text"); // true

isNotEmptyArray([]); // false
isNotEmptyArray([1, 2]); // true

isNullish(null); // true
isNullish(undefined); // true
isNullish(0); // false

isPrimitive("text"); // true
isPrimitive({}); // false

isFalsy(false); // true
isFalsy(""); // true
isFalsy(0); // true
isFalsy(null); // true
isFalsy(undefined); // true

isRealNumber(NaN); // false
isRealNumber(123); // true
```

### Object Utilities
```javascript
import { getValueByKey } from 'awesome-typeof';

const obj = { a: 1, b: 2 };
getValueByKey(obj, 'a'); // 1
```

## Type Utilities Examples

### OptionalPropertyOf
```typescript
type User = {
  name: string;
  age?: number;
  email?: string;
};
type OptionalKeys = OptionalPropertyOf<User>; // "age" | "email"
```

### PickOptionalPropertyAndRequire
```typescript
type PartialUser = {
  name?: string;
  age?: number;
};
type RequiredOptional = PickOptionalPropertyAndRequire<PartialUser>;
// { name: string; age: number }
```

### PromisifyFunc
```typescript
type SyncFunc = (a: number) => string;
type AsyncFunc = PromisifyFunc<SyncFunc>; 
// (a: number) => Promise<string>
```

### ValueOf & KeyOf
```typescript
type User = {
  id: number;
  name: string;
};
type UserKeys = KeyOf<User>; // "id" | "name"
type UserValues = ValueOf<User>; // number | string
```

## About mode

|                               | v1            | v2            |
|-------------------------------|---------------|---------------|
| `123`                         | `"number"`    | `"number"`    |
| `NaN`                         | `"number"`    | `"number"`    |
| `Infinity`                    | `"number"`    | `"number"`    |
| `-Infinity`                   | `"number"`    | `"number"`    |
| `new Number(123)`             | `"object"`    | `"Number"`    |
| `new Number(NaN)`             | `"object"`    | `"Number"`    |
| `new Number(Infinity)`        | `"object"`    | `"Number"`    |
| `new Number(-Infinity)`       | `"object"`    | `"Number"`    |
| `'123'`                       | `"string"`    | `"string"`    |
| `''`                          | `"string"`    | `"string"`    |
| `new String('123')`           | `"object"`    | `"String"`    |
| `new String('')`              | `"object"`    | `"String"`    |
| `true`                        | `"boolean"`   | `"boolean"`   |
| `new Boolean(true)`           | `"object"`    | `"Boolean"`   |
| `Symbol(1)`                   | `"symbol"`    | `"symbol"`    |
| `Object(Symbol(1)) `          | `"object"`    | `"Symbol"`    |
| `1n`                          | `"bigint"`    | `"bigint"`    |
| `Object(1n)`                  | `"object"`    | `"BigInt"`    |
| `undefined`                   | `"undefined"` | `"undefined"` |
| `Object(null)`                | `"null"`      | `"null"`      |
| `new Set()`                   | `"object"`    | `"Set"`       |
| `new Set([1, 2, 3])`          | `"object"`    | `"Set"`       |
| `new Map()`                   | `"object"`    | `"Map"`       |
| `new Map([['a', [1, 2, 3]]])` | `"object"`    | `"Map"`       |
| `[]`                          | `"object"`    | `"Array"`     |
| `[1,2,3]`                     | `"object"`    | `"Array"`     |
| `function() {}`               | `"object"`    | `"Function"`  |
| `() => 1`                     | `"object"`    | `"Function"`  |
| `class MyClass{}`             | `"object"`    | `"Function"`  |
| `new MyClass()`               | `"object"`    | `"MyClass"`   |
| `Promise.resolve(1)`          | `"object"`    | `"Promise"`   |
| `/123/`                       | `"object"`    | `"RegExp"`    |
| ..... .                       | ......        | ......        |
