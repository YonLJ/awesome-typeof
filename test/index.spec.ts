import {
  v1, v2,
  isNotEmptyString, isNotEmptyArray,
  isNotEmptySet, isNotEmptyMap,
  isNullish, isPrimitive, isFalsy,
  isRealNumber, getValueByKey
} from '../src/index';

function testTypeOf(v: unknown, types: [string, string]) {
  const [e1, e2] = types;
  expect(v1(v)).toBe(e1);
  expect(v2(v)).toBe(e2);
}

describe('awesome-typeof suites', () => {
  test('Number test', () => {
    testTypeOf(123, ['number', 'number']);
    testTypeOf(Number.NaN, ['number', 'number']);
    testTypeOf(Number.POSITIVE_INFINITY, ['number', 'number']);
    testTypeOf(Number.NEGATIVE_INFINITY, ['number', 'number']);
    testTypeOf(new Number(123), ['object', 'Number']);
    testTypeOf(new Number(Number.NaN), ['object', 'Number']);
    testTypeOf(new Number(Number.POSITIVE_INFINITY), ['object', 'Number']);
    testTypeOf(new Number(Number.NEGATIVE_INFINITY), ['object', 'Number']);
  });

  test('String test', () => {
    testTypeOf('123', ['string', 'string']);
    testTypeOf('', ['string', 'string']);
    testTypeOf(new String('123'), ['object', 'String']);
    testTypeOf(new String(''), ['object', 'String']);
  });

  test('Boolean test', () => {
    testTypeOf(true, ['boolean', 'boolean']);
    testTypeOf(new Boolean(true), ['object', 'Boolean']);
  });

  test('Symbol test', () => {
    testTypeOf(Symbol(1), ['symbol', 'symbol']);
    testTypeOf(Object(Symbol(1)), ['object', 'Symbol']);
  });

  test('BigInt test', () => {
    testTypeOf(1n, ['bigint', 'bigint']);
    testTypeOf(Object(1n), ['object', 'BigInt']);
  });

  test('Undefined test', () => {
    testTypeOf(undefined, ['undefined', 'undefined']);
  });

  test('Null test', () => {
    testTypeOf(null, ['null', 'null']);
  });

  test('Object test', () => {
    testTypeOf({}, ['object', 'Object']);
    testTypeOf(Object.create(null), ['object', 'Object']);
    testTypeOf(Object.create({a: 1}), ['object', 'Object']);
  });

  test('Set test', () => {
    testTypeOf(new Set(), ['object', 'Set']);
    testTypeOf(new Set([1, 2, 3]), ['object', 'Set']);
  });

  test('Map test', () => {
    testTypeOf(new Map(), ['object', 'Map']);
    testTypeOf(new Map([['a', [1, 2, 3]]]), ['object', 'Map']);
  });

  test('Array test', () => {
    testTypeOf([], ['object', 'Array']);
    testTypeOf([1, 2, 3], ['object', 'Array']);
  });

  test('Function test', () => {
    testTypeOf(function test() {}, ['object', 'Function']);
    testTypeOf(() => 1, ['object', 'Function']);
    testTypeOf(class MyClass{}, ['object', 'Function']);
  });

  test('Class test', () => {
    class MyClass {}
    testTypeOf(new MyClass(), ['object', 'MyClass']);
  });

  test('Promise test', () => {
    testTypeOf(Promise.resolve(1), ['object', 'Promise']);
  });

  test('RegExp test', () => {
    testTypeOf(/123/, ['object', 'RegExp']);
  });

  test('ArrayBuffer test', () => {
    testTypeOf(new ArrayBuffer(3), ['object', 'ArrayBuffer']);
  });
});

describe('Utility Functions', () => {
  describe('isNotEmptyString', () => {
    test('should return false for empty string', () => {
      expect(isNotEmptyString('')).toBe(false);
    });
    test('should return true for non-empty string', () => {
      expect(isNotEmptyString('text')).toBe(true);
    });
    test('should return false for non-string values', () => {
      expect(isNotEmptyString(123)).toBe(false);
      expect(isNotEmptyString(null)).toBe(false);
      expect(isNotEmptyString(undefined)).toBe(false);
    });
  });

  describe('isNotEmptyArray', () => {
    test('should return false for empty array', () => {
      expect(isNotEmptyArray([])).toBe(false);
    });
    test('should return true for non-empty array', () => {
      expect(isNotEmptyArray([1, 2])).toBe(true);
    });
    test('should return false for non-array values', () => {
      expect(isNotEmptyArray('array')).toBe(false);
      expect(isNotEmptyArray({ length: 0 })).toBe(false);
    });
  });

  describe('isNotEmptySet', () => {
    test('should return false for empty Set', () => {
      expect(isNotEmptySet(new Set())).toBe(false);
    });
    test('should return true for non-empty Set', () => {
      expect(isNotEmptySet(new Set([1]))).toBe(true);
    });
  });

  describe('isNotEmptyMap', () => {
    test('should return false for empty Map', () => {
      expect(isNotEmptyMap(new Map())).toBe(false);
    });
    test('should return true for non-empty Map', () => {
      expect(isNotEmptyMap(new Map([['key', 'value']]))).toBe(true);
    });
  });

  describe('isNullish', () => {
    test('should return true for null and undefined', () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
    });
    test('should return false for other values', () => {
      expect(isNullish(0)).toBe(false);
      expect(isNullish('')).toBe(false);
      expect(isNullish(false)).toBe(false);
    });
  });

  describe('isPrimitive', () => {
    test('should return true for primitive values', () => {
      expect(isPrimitive('text')).toBe(true);
      expect(isPrimitive(123)).toBe(true);
      expect(isPrimitive(true)).toBe(true);
      expect(isPrimitive(null)).toBe(true);
      expect(isPrimitive(undefined)).toBe(true);
    });
    test('should return false for objects', () => {
      expect(isPrimitive({})).toBe(false);
      expect(isPrimitive([])).toBe(false);
      expect(isPrimitive(() => {})).toBe(false);
    });
  });

  describe('isFalsy', () => {
    test('should return true for falsy values', () => {
      expect(isFalsy(false)).toBe(true);
      expect(isFalsy('')).toBe(true);
      expect(isFalsy(0)).toBe(true);
      expect(isFalsy(null)).toBe(true);
      expect(isFalsy(undefined)).toBe(true);
    });
    test('should return false for truthy values', () => {
      expect(isFalsy(true)).toBe(false);
      expect(isFalsy('text')).toBe(false);
      expect(isFalsy(1)).toBe(false);
      expect(isFalsy({})).toBe(false);
    });
  });

  describe('isRealNumber', () => {
    test('should return false for NaN', () => {
      expect(isRealNumber(NaN)).toBe(false);
    });
    test('should return true for real numbers', () => {
      expect(isRealNumber(123)).toBe(true);
      expect(isRealNumber(-1.23)).toBe(true);
    });
    test('should return false for non-numbers', () => {
      expect(isRealNumber('123')).toBe(false);
      expect(isRealNumber(null)).toBe(false);
    });
  });

  describe('getValueByKey', () => {
    test('should return correctly typed value by key', () => {
      const obj = { a: 1, b: 'text', c: true };
      expect(getValueByKey(obj, 'a')).toBe(1);
      expect(getValueByKey(obj, 'b')).toBe('text');
      expect(getValueByKey(obj, 'c')).toBe(true);
    });
    
    test('should maintain type safety', () => {
      const obj = { a: 1, b: 'text' };
      const num: number = getValueByKey(obj, 'a');
      const str: string = getValueByKey(obj, 'b');
      expect(num + 1).toBe(2);
      expect(str.toUpperCase()).toBe('TEXT');
    });
  });
});


