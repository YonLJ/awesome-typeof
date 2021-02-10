type JSType = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'null' | 'object';

const getType = (v: unknown) => Object.prototype.toString.call(v).slice(8, -1);

/**
 * Determines the type of a given value.
 * @param v value
 * @returns simple type, 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'null' | 'object'
 */
export const v1 = (v: unknown): JSType => {
  if (v === null || v === undefined) {
    return String(v) as JSType;
  }

  const type = typeof v;
  if (type === 'function') {
    return 'object';
  }

  return type;
};

/**
 * Determines the type of a given value.
 * @param v value
 * @returns detailed type
 */
export const v2 = (v: unknown) => {
  if (v === null || v === undefined) {
    return String(v);
  }

  if (typeof v === 'object' || typeof v === 'function') {
    try {
      return v.constructor.name;
    } catch (error) {
      return getType(v);
    }
  }

  return getType(v).toLowerCase();
};
