import * as util from 'util';
import { langFiles } from 'beepbot-lang';

/**
 * Get the translation for the key given and the locale.
 * If the locale given does not have the key the default of en_US is used.
 */
function get(locale: string, key: string): string {
  if (langFiles[locale] == null || langFiles[locale][key] == null) {
    return langFiles['en_US'][key];
  }
  return langFiles[locale][key];
}

/**
 * Translate a string using the locale & key along with the arguments.
 */
function translate(locale: string, key: string, ...optArgs: any[]): string {
  let localised = get(locale, key);
  if (/(%s|%d)/gi.test(localised)) {
    return util.format(localised, ...optArgs);
  }
  return localised;
}

/**
 * Format a string message replacing the util args with the ones supplied in the arguments.
 */
function format(str: string, ...optArgs: any[]): string {
  if (/(%s|%d)/gi.test(str)) {
    return util.format(str, ...optArgs);
  }
  return str;
}

export const Locale = {
  get,
  translate,
  format
};
