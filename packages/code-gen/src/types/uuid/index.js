import { TypeBuilder, TypeCreator } from "../TypeBuilder.js";

const stringType = JSON.stringify(
  {
    ...TypeBuilder.baseData,
    type: "string",
    validator: {
      min: 36,
      max: 36,
      lowerCase: true,
      trim: true,
      pattern:
        "/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/gi",
    },
  },
  undefined,
  1,
).replace(/\n/g, " ");

class UuidType extends TypeBuilder {
  static baseData = {};

  constructor(group, name) {
    super(uuidType.name, group, name);

    this.data = {
      ...this.data,
      ...UuidType.getBaseData(),
    };
  }
}

const uuidType = {
  name: "uuid",
  class: UuidType,
  jsType: () => `string`,
  tsType: () => `string`,
  validator: () => `
{{ const fnNumber = ctx.anonFn(${stringType}); }}

return stringValidator{{= fnNumber }}(value, propertyPath, errorList, parentType);
`,
  sql: () =>
    `UUID {{= item?.sql?.primary ? "PRIMARY KEY DEFAULT uuid_generate_v4()" : item?.isOptional && !item?.defaultValue ? "NULL" : "NOT NULL" }}`,
};

/**
 * @name TypeCreator#uuid
 * @param {string} [name]
 * @returns {UuidType}
 */
TypeCreator.prototype.uuid = function (name) {
  return new UuidType(this.group, name);
};

TypeCreator.types.set(uuidType.name, uuidType);
