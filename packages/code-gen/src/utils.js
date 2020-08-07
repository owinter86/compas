import { compileTemplate, isNil, isPlainObject } from "@lbu/stdlib";
import { TypeCreator } from "./types/index.js";

/**
 * @param {*} data
 * @param {string} type
 * @returns {string[]}
 */
export function getGroupsThatIncludeType(data, type) {
  if (!isPlainObject(data)) {
    throw new Error(`data should be an object.`);
  }

  const result = [];

  for (const groupData of Object.values(data)) {
    for (const item of Object.values(groupData)) {
      if (item.type === type) {
        result.push(item.group);
        break;
      }
    }
  }

  return result;
}

/**
 * Uppercase first character of the input string
 *
 * @param {string} str input string
 * @returns {string}
 */
export function upperCaseFirst(str) {
  return str.length > 0 ? str[0].toUpperCase() + str.substring(1) : "";
}

/**
 * Lowercase first character of the input string
 *
 * @param {string} str input string
 * @returns {string}
 */
export function lowerCaseFirst(str) {
  return str.length > 0 ? str[0].toLowerCase() + str.substring(1) : "";
}

/**
 * Compile templates from types and build a dynamic execute template function
 *
 * @param {TemplateContext} tc
 * @param {object} options
 * @param {string} key
 * @param {string} fnStringStart
 * @param {function(TypePlugin, string): string} fnStringAdd
 * @param {string} fnStringEnd
 * @param {string} [pluginKey]
 * @returns {void}
 */
export function compileDynamicTemplates(
  tc,
  options,
  key,
  { fnStringStart, fnStringAdd, fnStringEnd },
  pluginKey = key,
) {
  const typePlugins = TypeCreator.getTypesWithProperty(pluginKey);
  const optsKey = `${key}_enabledTypes`;

  options[optsKey] = [];
  let fnString = fnStringStart;

  for (const type of typePlugins) {
    options[optsKey].push(type.name);

    const templateName = `${type.name}${upperCaseFirst(key)}`;
    compileTemplate(tc, templateName, type[pluginKey]());

    fnString += fnStringAdd(type, templateName);
  }

  fnString += fnStringEnd;

  compileTemplate(tc, `${key}Exec`, fnString);
}

/**
 * Try to get the (recursive) (referenced) item.
 * Only works in the preGenerate or generate phase of code-generation
 *
 * @param {object} item
 * @returns {object}
 */
export function getItem(item) {
  if (item?.type !== "reference") {
    return item;
  }

  if (!isNil(item?.referencedItem)) {
    return getItem(item.referencedItem);
  }

  return undefined;
}
