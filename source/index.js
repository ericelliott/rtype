import { isPredicate, isString } from './builtins/index';
export * from './builtins/index';

const rtype = (type) => {
  if (isString(type)) {
    console.warn('Warning rtype string parsing is not implemented yet');
    return true;
  }
  if (isPredicate(type)) {
    return type;
  }
  throw new TypeError('rtype(type: Predicate | String) => Predicate');
};

export default rtype;
