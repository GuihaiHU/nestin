import * as dotenv from 'dotenv';

dotenv.config();

function fromatValue<T>(key: string, defaultValue: T, callback: (value: string) => T): T {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  return callback(value);
}

export const envString = (key: string, defaultValue: string = '') => fromatValue(key, defaultValue, value => value);

export const envNumber = (key: string, defaultValue: number = 0) =>
  fromatValue(key, defaultValue, value => Number(value));

export const envBoolean = (key: string, defaultValue: boolean = false) =>
  fromatValue(key, defaultValue, value => value === 'true');
