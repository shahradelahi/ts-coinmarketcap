export function noUndefined<T extends object>(obj: T, deep: boolean = false): T {
  const newObj: Partial<T> = {} as Partial<T>;
  for (const key in obj) {
    if (obj[key] !== undefined) {
      if (deep && typeof obj[key] === 'object' && obj[key] !== null) {
        (newObj as any)[key] = noUndefined(obj[key] as any, true);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj as T;
}
