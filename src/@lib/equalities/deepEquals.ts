const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === "object" && object !== null;
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    const flatA = objA.flat(Infinity);
    const flatB = objB.flat(Infinity);

    return flatA.every((val, i) => val === flatB[i]);
  }

  if (isObject(objA) && isObject(objB)) {
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }

    const sortObjA = Object.keys(objA)
      .sort()
      .reduce(
        (obj, key) => {
          obj[key] = objA[key];
          return obj;
        },
        {} as Record<string, unknown>,
      );
    const sortObjB = Object.keys(objB)
      .sort()
      .reduce(
        (obj, key) => {
          obj[key] = objB[key];
          return obj;
        },
        {} as Record<string, unknown>,
      );
    return JSON.stringify(sortObjA) === JSON.stringify(sortObjB);
  }

  return false;
}
