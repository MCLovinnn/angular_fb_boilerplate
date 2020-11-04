import { Injectable } from '@angular/core';

export interface IFlatObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataFlattnerService {

  constructor() {
  }

  public static isFlat(object: any): object is IFlatObject {
    if (!(typeof object === 'object')) {
      return false;
    }
    return true;
  }

  /** isBuffer
   * used for flatten unflatten
   * @obj
   */
  public static isBuffer(obj) {
    return obj != null && obj.constructor != null &&
      typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
  }

  public static flatten(target, opts?: { delimiter?: string, maxDepth?: number, safe?: boolean }) {
    opts = opts || {};

    const delimiter = opts.delimiter || '.';
    const maxDepth = opts.maxDepth;
    const output = {};

    function step(object, prev?: any, currentDepth?: any) {
      currentDepth = currentDepth || 1;
      Object.keys(object).forEach((key) => {
        const value = object[key];
        const isArray = opts.safe && Array.isArray(value);
        const type = Object.prototype.toString.call(value);
        const isBuffer = DataFlattnerService.isBuffer(value);
        const isObject = (
          type === '[object Object]' ||
          type === '[object Array]'
        );

        const newKey = prev ? prev + delimiter + key : key;

        if (!isArray && !isBuffer && isObject && Object.keys(value).length &&
          (!opts.maxDepth || currentDepth < maxDepth)) {
          return step(value, newKey, currentDepth + 1);
        }

        output[newKey] = value;
      });
    }

    step(target);

    return output;
  }

  public static unflatten(target, opts?: { delimiter?: string, overwrite?: number, object?: boolean }) {
    opts = opts || {};

    const delimiter = opts.delimiter || '.';
    const overwrite = opts.overwrite;
    const result = {};

    const isBuffer = DataFlattnerService.isBuffer(target);
    if (isBuffer || Object.prototype.toString.call(target) !== '[object Object]') {
      return target;
    }

    function getKey(key) {
      const parsedKey = key;

      return (
        isNaN(parsedKey) ||
        key.indexOf('.') !== -1 ||
        opts.object) ? key : parsedKey;
    }

    const sortKeys = Object.keys(target).sort((keyA, keyB) => {
      return keyA.length - keyB.length;
    });

    sortKeys.forEach((key) => {
      const split = key.split(delimiter);
      let key1 = getKey(split.shift());
      let key2 = getKey(split[0]);
      let recipient = result;

      while (key2 !== undefined) {
        const type = Object.prototype.toString.call(recipient[key1]);
        const isObject = (
          type === '[object Object]' ||
          type === '[object Array]'
        );

        if (!overwrite && !isObject && typeof recipient[key1] !== 'undefined') {
          return;
        }

        if ((overwrite && !isObject) || (!overwrite && recipient[key1] == null)) {
          recipient[key1] = (
            typeof key2 === 'number' &&
            !opts.object ? [] : {}
          );
        }

        recipient = recipient[key1];
        if (split.length > 0) {
          key1 = getKey(split.shift());
          key2 = getKey(split[0]);
        }
      }

      recipient[key1] = DataFlattnerService.unflatten(target[key], opts);
    });

    return result;
  }
}
