/**
 * Returns an environment variable.
 * @param key The key of the environment variable.
 * @param default_value The default value of the variable.
 */
export function getEnv(key: string, default_value = ''): string {
  // @ts-ignore
  if (window['env'] && window['env'][key]) {
    // @ts-ignore
    return window['env'][key];
  }
  return default_value;
}

/**
 * Converts a string to a number.
 * @param value The string to be converted.
 */
export function toNumber(value: string): number {
  return parseInt(value, 10);
}
