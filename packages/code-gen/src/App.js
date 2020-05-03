import { newLogger, printProcessMemoryUsage } from "@lbu/insight";
import { isNil, isPlainObject, newTemplateContext } from "@lbu/stdlib";
import { existsSync, promises } from "fs";
import path from "path";
import { isNamedTypeBuilderLike, TypeCreator } from "./types/index.js";
import { lowerCaseFirst, upperCaseFirst } from "./utils.js";

const { writeFile, mkdir } = promises;

/**
 * @typedef {object} AppOpts
 * @property {GeneratorPlugin[]} generators
 * @property {boolean} [verbose]
 */

/**
 * @typedef {object} GeneratorPlugin
 * @property {string} name
 * @property {function(App): void|Promise<void>} [init]
 * @property {function(App, GenerateOptions): void|Promise<void>} [preGenerate]
 * @property {function(App, GenerateOptions, object):
 *   GeneratedFile[]|GeneratedFile|Promise<GeneratedFile[]|GeneratedFile>} [generate]
 * @property {function(App, GenerateStubsOptions): void|Promise<void>} [preGenerateStubs]
 * @property {function(App, GenerateStubsOptions, object):
 *   GeneratedFile[]|GeneratedFile|Promise<GeneratedFile[]|GeneratedFile>} [generateStubs]
 */

/**
 * @typedef {object} GenerateOptions
 * @property {boolean} [useTypescript]
 * @property {string} [fileHeader]
 * @property {string} outputDirectory
 */

/**
 * @typedef {object} GenerateStubsOptions
 * @property {boolean} [useTypescript]
 * @property {string} [fileHeader]
 * @property {string} outputDirectory
 * @property {string} group
 * @property {string[]} generators
 * @property
 */

/**
 * @typedef {object} GeneratedFile
 * @property {string} path
 * @property {string} source
 */

/**
 * @class
 */
export class App {
  /**
   * @param {AppOpts} options
   */
  constructor({ verbose, generators }) {
    /**
     * @public
     * @type {Map<string, GeneratorPlugin>}
     */
    this.generators = new Map();

    this.fileHeader = `// Generated by @lbu/code-gen at ${new Date().toISOString()}
/* eslint-disable no-unused-vars */
`;

    /**
     * @public
     * @type {boolean}
     */
    this.verbose = verbose || false;

    /**
     * @public
     * @type {Logger}
     */
    this.logger = newLogger({
      ctx: {
        type: "code_gen",
      },
      depth: 8,
    });

    /**
     * @public
     * @type {TemplateContext}
     */
    this.templateContext = newTemplateContext();
    this.templateContext.strict = false;

    /** @type {Set<TypeBuilder>} */
    this.unprocessedData = new Set();

    /** @type {{structure: object<key, object<key, object>>}} */
    this.data = {
      structure: {},
    };

    this._generatorList = generators;
  }

  /**
   * Init generators and validate types
   * @return {Promise<void>}
   */
  async init() {
    this.templateContext.globals["upperCaseFirst"] = upperCaseFirst;
    this.templateContext.globals["lowerCaseFirst"] = lowerCaseFirst;

    for (const g of this._generatorList) {
      if (isNil(g.name)) {
        throw new Error("Generator is missing name");
      }

      this.generators.set(g.name, g);
    }

    if (this.verbose) {
      this.logger.info("registered plugins: ", {
        generators: [...this.generators.keys()],
        types: [...TypeCreator.types.keys()],
      });
    }

    await this.callGeneratorMethod("init");
  }

  /**
   * @public
   * @param {...TypeBuilder} builders
   * @return {this}
   */
  add(...builders) {
    for (const builder of builders) {
      this.unprocessedData.add(builder);
    }

    return this;
  }

  /**
   * @public
   * @param data
   */
  extend(data) {
    if (!isPlainObject(data?.structure)) {
      throw new Error(`data.structure should be an object.`);
    }

    for (const groupData of Object.values(data.structure)) {
      for (const item of Object.values(groupData)) {
        this.addToData(item);
      }
    }
  }

  /**
   * Run the generate methods on the plugins
   * @param {GenerateOptions} options
   */
  async generate(options) {
    if (isNil(options?.outputDirectory)) {
      throw new Error("Need options.outputDirectory to write files to.");
    }
    options.fileHeader = this.fileHeader + (options.fileHeader ?? "");
    options.useTypescript = !!options.useTypescript;

    await this.callGeneratorMethod("preGenerate", options);
    this.processData();

    const generatorInput = JSON.parse(JSON.stringify(this.data));
    const result = await this.callGeneratorMethod(
      "generate",
      options,
      generatorInput,
    );

    await this.normalizeAndWriteFiles(options, result);

    printProcessMemoryUsage(this.logger);
  }

  /**
   * Generate stubs can help assist a package author to comply to the needed spec
   * @param {GenerateStubsOptions} options
   * @return {Promise<void>}
   */
  async generateStubs(options) {
    if (isNil(options?.outputDirectory)) {
      throw new Error("Need options.outputDirectory to write files to.");
    }
    if (isNil(options?.group) || isNil(this.data.structure[options.group])) {
      throw new Error("Need options.group be an existing group");
    }

    options.fileHeader = this.fileHeader + (options.fileHeader ?? "");
    options.useTypescript = !!options.useTypescript;

    for (const gen of options.generators) {
      await this.callSpecificGeneratorWithMethod(
        gen,
        "preGenerateStubs",
        options,
      );
    }

    this.processData();

    const stubData = {
      structure: {
        [options.group]: this.data.structure[options.group],
      },
    };

    for (const value of Object.values(stubData.structure[options.group])) {
      this.fillReferencedTypes(stubData, value);
    }

    const input = JSON.parse(JSON.stringify(stubData));

    const result = [];
    for (const gen of options.generators) {
      result.push(
        await this.callSpecificGeneratorWithMethod(
          gen,
          "generateStubs",
          options,
          input,
        ),
      );
    }

    await this.normalizeAndWriteFiles(options, result);

    printProcessMemoryUsage(this.logger);
  }

  /**
   * @private
   * Call a method on all known generator plugins
   * Will pass this as the first argument
   * @param {string} method
   * @param {...*} args
   */
  async callGeneratorMethod(method, ...args) {
    const result = [];

    for (const key of this.generators.keys()) {
      const tmp = await this.callSpecificGeneratorWithMethod(
        key,
        method,
        ...args,
      );
      if (tmp) {
        result.push(tmp);
      }
    }

    return result;
  }

  /**
   * @private
   * @param generatorName
   * @param method
   * @param args
   * @return {Promise<undefined|*>}
   */
  async callSpecificGeneratorWithMethod(generatorName, method, ...args) {
    const gen = this.generators.get(generatorName);
    if (!gen) {
      throw new Error(`Could not find generator with name: ${generatorName}`);
    }
    if (method in gen) {
      if (this.verbose) {
        this.logger.info(`generator: calling ${method} on ${gen.name}`);
      }
      return gen[method](this, ...args);
    }

    return undefined;
  }

  /**
   * @private
   * @param {GenerateOptions} options
   * @param {(GeneratedFile|GeneratedFile[])[]} files
   */
  async normalizeAndWriteFiles(options, files) {
    const flattenedFiles = [];

    for (const file of files) {
      if (!Array.isArray(file) && isPlainObject(file)) {
        flattenedFiles.push(file);
      } else if (Array.isArray(file)) {
        flattenedFiles.push(...file);
      }
    }

    if (!existsSync(options.outputDirectory)) {
      await mkdir(options.outputDirectory, { recursive: true });
    }

    for (const file of flattenedFiles) {
      const filePath = path.join(options.outputDirectory, file.path);
      await writeFile(filePath, file.source, { encoding: "utf-8" });
    }
  }

  /**
   * @private
   * Process unprocessed list, normalize references
   * Depends on referentType being available
   */
  processData() {
    for (const item of this.unprocessedData) {
      const result = item.build();
      this.addToData(result);
    }
    this.unprocessedData.clear();

    for (const group of Object.values(this.data.structure)) {
      for (const item of Object.values(group)) {
        this.normalizeDataRecursively(item);
      }
    }
  }

  /**
   * @private
   * @param item
   */
  addToData(item) {
    if (!item.group || !item.name || !item.type) {
      throw new Error(
        `Can't process item. Missing either group, name or type. Found: ${JSON.stringify(
          item,
        )}`,
      );
    }

    if (!this.data.structure[item.group]) {
      this.data.structure[item.group] = {};
    }
    this.data.structure[item.group][item.name] = item;

    item.uniqueName = upperCaseFirst(item.group) + upperCaseFirst(item.name);
  }

  /**
   * @private
   * On the way down, register unknown named models
   * On the way up, replace anything that is named with a reference type
   * @param value
   */
  normalizeDataRecursively(value) {
    if (isNil(value) || (!isPlainObject(value) && !Array.isArray(value))) {
      // Skip primitives & null / undefined
      return;
    }

    if (isNamedTypeBuilderLike(value)) {
      // Most likely valid output from TypeBuilder
      // Just overwrite it
      this.addToData(value);
    }

    if (isPlainObject(value)) {
      for (const key of Object.keys(value)) {
        this.normalizeDataRecursively(value[key]);
        if (isNamedTypeBuilderLike(value[key])) {
          // value[key] got a uniqueName when called with this.addToData()
          value[key] = {
            type: "reference",
            docString: "",
            isOptional: false,
            reference: {
              group: value[key].group,
              name: value[key].name,
              uniqueName: value[key].uniqueName,
            },
          };
        }
      }
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; ++i) {
        this.normalizeDataRecursively(value[i]);
        if (isNamedTypeBuilderLike(value[i])) {
          // value[i] got a uniqueName when called with this.addToData()
          value[i] = {
            type: "reference",
            docString: "",
            isOptional: false,
            reference: {
              group: value[i].group,
              name: value[i].name,
              uniqueName: value[i].uniqueName,
            },
          };
        }
      }
    }
  }

  /**
   * @private
   * Find nested references and add to stubData in the correct group
   * @param stubData
   * @param value
   */
  fillReferencedTypes(stubData, value) {
    if (isNil(value) || (!isPlainObject(value) && !Array.isArray(value))) {
      // Skip primitives & null / undefined
      return;
    }

    if (
      isPlainObject(value) &&
      value.type &&
      value.type === "reference" &&
      isPlainObject(value.reference)
    ) {
      const { group, name } = value.reference;
      if (
        !isNil(this.data.structure[group]?.[name]) &&
        isNil(stubData.structure[group]?.[name])
      ) {
        if (isNil(stubData.structure[group])) {
          stubData.structure[group] = {};
        }

        const refValue = this.data.structure[group][name];
        stubData.structure[group][name] = refValue;
        this.fillReferencedTypes(stubData, refValue);
      }
    }

    if (isPlainObject(value)) {
      for (const key of Object.keys(value)) {
        this.fillReferencedTypes(stubData, value[key]);
      }
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; ++i) {
        this.fillReferencedTypes(stubData, value[i]);
      }
    }
  }
}
