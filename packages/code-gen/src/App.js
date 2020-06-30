import { newLogger, printProcessMemoryUsage } from "@lbu/insight";
import { isNil, isPlainObject } from "@lbu/stdlib";
import { inspect } from "util";
import {
  addToData,
  callGeneratorMethod,
  hoistNamedItems,
  runGenerators,
} from "./generate.js";
import { generators, generatorTemplates } from "./generators/index.js";
import { TypeCreator } from "./types/index.js";
import { lowerCaseFirst, upperCaseFirst } from "./utils.js";

/**
 * @class
 */
export class App {
  /**
   * @type {string[]}
   */
  static defaultEslintIgnore = ["no-unused-vars"];

  /**
   * @param {AppOpts} options
   */
  constructor({ verbose }) {
    /**
     * @type {string}
     */
    this.fileHeader = `// Generated by @lbu/code-gen\n`;

    /**
     * @type {boolean}
     */
    this.verbose = verbose || false;

    /**
     * @type {Logger}
     */
    this.logger = newLogger({
      ctx: {
        type: "code_gen",
      },
      depth: 4,
    });

    /** @type {Set<TypeBuilder>} */
    this.unprocessedData = new Set();

    /** @type {{structure: object<key, object<key, object>>}} */
    this.data = {
      structure: {},
    };
  }

  /**
   * Create a new App instance
   *
   * @public
   * @param {AppOpts} [options={}] Optional options
   * @returns {Promise<App>}
   */
  static async new(options = {}) {
    const app = new App(options);
    await app.init();
    return app;
  }

  /**
   * Init generators and validate types
   *
   * @private
   * @returns {Promise<void>}
   */
  async init() {
    generatorTemplates.globals["upperCaseFirst"] = upperCaseFirst;
    generatorTemplates.globals["lowerCaseFirst"] = lowerCaseFirst;
    generatorTemplates.globals["inspect"] = (arg) =>
      inspect(arg, { sorted: true, colors: false, depth: 15 });

    if (this.verbose) {
      this.logger.info({
        msg: "Registered plugins: ",
        generators: [...generators.keys()],
        types: [...TypeCreator.types.keys()],
      });
    }

    await callGeneratorMethod(this, generators.keys(), "init");
  }

  /**
   * @param {...TypeBuilder} builders
   * @returns {this}
   */
  add(...builders) {
    for (const builder of builders) {
      this.unprocessedData.add(builder);
    }

    return this;
  }

  /**
   * @param data
   */
  extend(data) {
    if (!isPlainObject(data)) {
      throw new Error(`data should be an object.`);
    }

    for (const groupData of Object.values(data)) {
      for (const item of Object.values(groupData)) {
        this.addToData(item);
      }
    }
  }

  /**
   * @param {GenerateOpts} options
   * @returns {Promise<void>}
   */
  async generate(options) {
    if (isNil(options?.outputDirectory)) {
      throw new Error("Need options.outputDirectory to write files to.");
    }
    options.fileHeader =
      this.fileHeader + formatEslint() + (options.fileHeader ?? "");
    options.useTypescript = !!options.useTypescript;
    options.dumpStructure = !!options.dumpStructure;
    options.useStubGenerators = !!options.useStubGenerators;
    options.enabledGenerators = options.enabledGenerators || [
      ...generators.keys(),
    ];

    this.processData();
    hoistNamedItems(this.data, this.data.structure);

    options.enabledGroups =
      options.enabledGroups || Object.keys(this.data.structure);
    if (options.enabledGroups.length === 0) {
      throw new Error("Need at least a single group in enabledGroups");
    }

    // Make sure to do the same case conversion here as well as to not confuse the user.
    options.enabledGroups = options.enabledGroups.map((it) =>
      lowerCaseFirst(it),
    );

    await runGenerators(this, options);
    printProcessMemoryUsage(this.logger);
  }

  /**
   * Process unprocessed list, normalize references
   * Depends on referentType being available
   *
   * @private
   */
  processData() {
    for (const item of this.unprocessedData) {
      const result = item.build();
      this.addToData(result);
    }
    this.unprocessedData.clear();
  }

  /**
   * @private
   * @param item
   */
  addToData(item) {
    addToData(this.data, item);
  }
}

/**
 * Format eslint-disable comment
 *
 * @returns {string}
 */
function formatEslint() {
  return `/* eslint-disable ${App.defaultEslintIgnore.join(", ")} */\n`;
}
