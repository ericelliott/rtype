import is from 'is';

export const isAny = () => true;

export const isArray = (x) => is.array(x);

export const isBoolean = (x) => is.bool(x);

export const isFunction = (x) => is.fn(x);

export const isNumber = (x) => is.number(x);

export const isObject = (x) => is.object(x);

export const isPredicate = (x) => {
  if (!is.fn(x)) {
    return false;
  }
  return is.bool(x());
};

export const isString = (x) => is.string(x);

export const isVoid = (x) => is.undef(x);
