const is = {
  defined: <T>(val: T): boolean => typeof val !== 'undefined' && val !== null,
  bool: <T>(val: T): boolean => typeof val === 'boolean',
  number: <T>(val: T): boolean => typeof val === 'number' && !Number.isNaN(val),
  nan: <T>(val: T): boolean => typeof val === 'number' && Number.isNaN(val),
  string: <T>(val: T): boolean => typeof val === 'string',
  fn: <T>(val: T): boolean => typeof val === 'function',
  async: <T>(val: T): boolean =>
    typeof val === 'function' &&
    !!val.constructor &&
    val.constructor.name === 'AsyncFunction',
  promise: <T>(val: T): boolean => val instanceof Promise,
  buffer: <T>(val: T): boolean => val instanceof Buffer,
  array: <T>(val: T): boolean => Array.isArray(val),
  object: <T>(val: T): boolean => typeof val === 'object',
  plainObject: <T>(val: T): boolean =>
    Object.prototype.toString.call(val) === '[object Object]',
}
export default is
