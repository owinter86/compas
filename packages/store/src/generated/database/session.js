// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

import { AppError, isNil, isPlainObject, isStaging } from "@compas/stdlib";
import { isQueryPart, query } from "@compas/store";
import {
  validateStoreSessionOrderBy,
  validateStoreSessionOrderBySpec,
  validateStoreSessionQueryBuilder,
  validateStoreSessionWhere,
} from "../store/validators.js";

const sessionFieldSet = new Set([
  "expires",
  "data",
  "id",
  "createdAt",
  "updatedAt",
]);
/**
 * Get all fields for session
 *
 * @param {string} [tableName="s."]
 * @param {{ excludePrimaryKey: boolean }} [options={}]
 * @returns {QueryPart}
 */
export function sessionFields(tableName = "s.", options = {}) {
  if (tableName.length > 0 && !tableName.endsWith(".")) {
    tableName = `${tableName}.`;
  }
  if (options.excludePrimaryKey) {
    return query([
      `${tableName}"expires", ${tableName}"data", ${tableName}"createdAt", ${tableName}"updatedAt"`,
    ]);
  }
  return query([
    `${tableName}"id", ${tableName}"expires", ${tableName}"data", ${tableName}"createdAt", ${tableName}"updatedAt"`,
  ]);
}
/**
 * Build 'WHERE ' part for session
 *
 * @param {StoreSessionWhere} [where={}]
 * @param {string} [tableName="s."]
 * @param {{ skipValidator?: boolean|undefined }} [options={}]
 * @returns {QueryPart}
 */
export function sessionWhere(where = {}, tableName = "s.", options = {}) {
  if (tableName.length > 0 && !tableName.endsWith(".")) {
    tableName = `${tableName}.`;
  }
  if (!options.skipValidator) {
    where = validateStoreSessionWhere(where, "$.sessionWhere");
  }
  const strings = ["1 = 1"];
  const values = [undefined];
  if (!isNil(where.$raw) && isQueryPart(where.$raw)) {
    strings.push(" AND ");
    values.push(where.$raw);
  }
  if (Array.isArray(where.$or) && where.$or.length > 0) {
    strings.push(" AND ((");
    for (let i = 0; i < where.$or.length; i++) {
      values.push(sessionWhere(where.$or[i], tableName));
      if (i === where.$or.length - 1) {
        strings.push("))");
        values.push(undefined);
      } else {
        strings.push(") OR (");
      }
    }
  }
  if (where.id !== undefined) {
    strings.push(` AND ${tableName}"id" = `);
    values.push(where.id);
  }
  if (where.idNotEqual !== undefined) {
    strings.push(` AND ${tableName}"id" != `);
    values.push(where.idNotEqual);
  }
  if (where.idIn !== undefined) {
    if (isQueryPart(where.idIn)) {
      strings.push(` AND ${tableName}"id" = ANY(`, ")");
      values.push(where.idIn, undefined);
    } else if (Array.isArray(where.idIn)) {
      strings.push(` AND ${tableName}"id" = ANY(ARRAY[`);
      for (let i = 0; i < where.idIn.length; ++i) {
        values.push(where.idIn[i]);
        if (i !== where.idIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::uuid[])");
      if (where.idIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.idNotIn !== undefined) {
    if (isQueryPart(where.idNotIn)) {
      strings.push(` AND ${tableName}"id" != ANY(`, ")");
      values.push(where.idNotIn, undefined);
    } else if (Array.isArray(where.idNotIn)) {
      strings.push(` AND NOT (${tableName}"id" = ANY(ARRAY[`);
      for (let i = 0; i < where.idNotIn.length; ++i) {
        values.push(where.idNotIn[i]);
        if (i !== where.idNotIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::uuid[]))");
      if (where.idNotIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.idLike !== undefined) {
    strings.push(` AND ${tableName}"id" LIKE `);
    values.push(`%${where.idLike}%`);
  }
  if (where.idNotLike !== undefined) {
    strings.push(` AND ${tableName}"id" NOT LIKE `);
    values.push(`%${where.idNotLike}%`);
  }
  if (where.expires !== undefined) {
    strings.push(` AND ${tableName}"expires" = `);
    values.push(where.expires);
  }
  if (where.expiresNotEqual !== undefined) {
    strings.push(` AND ${tableName}"expires" != `);
    values.push(where.expiresNotEqual);
  }
  if (where.expiresIn !== undefined) {
    if (isQueryPart(where.expiresIn)) {
      strings.push(` AND ${tableName}"expires" = ANY(`, ")");
      values.push(where.expiresIn, undefined);
    } else if (Array.isArray(where.expiresIn)) {
      strings.push(` AND ${tableName}"expires" = ANY(ARRAY[`);
      for (let i = 0; i < where.expiresIn.length; ++i) {
        values.push(where.expiresIn[i]);
        if (i !== where.expiresIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::timestamptz[])");
      if (where.expiresIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.expiresNotIn !== undefined) {
    if (isQueryPart(where.expiresNotIn)) {
      strings.push(` AND ${tableName}"expires" != ANY(`, ")");
      values.push(where.expiresNotIn, undefined);
    } else if (Array.isArray(where.expiresNotIn)) {
      strings.push(` AND NOT (${tableName}"expires" = ANY(ARRAY[`);
      for (let i = 0; i < where.expiresNotIn.length; ++i) {
        values.push(where.expiresNotIn[i]);
        if (i !== where.expiresNotIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::timestamptz[]))");
      if (where.expiresNotIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.expiresGreaterThan !== undefined) {
    strings.push(` AND ${tableName}"expires" > `);
    values.push(where.expiresGreaterThan);
  }
  if (where.expiresLowerThan !== undefined) {
    strings.push(` AND ${tableName}"expires" < `);
    values.push(where.expiresLowerThan);
  }
  if (where.createdAt !== undefined) {
    strings.push(` AND ${tableName}"createdAt" = `);
    values.push(where.createdAt);
  }
  if (where.createdAtNotEqual !== undefined) {
    strings.push(` AND ${tableName}"createdAt" != `);
    values.push(where.createdAtNotEqual);
  }
  if (where.createdAtIn !== undefined) {
    if (isQueryPart(where.createdAtIn)) {
      strings.push(` AND ${tableName}"createdAt" = ANY(`, ")");
      values.push(where.createdAtIn, undefined);
    } else if (Array.isArray(where.createdAtIn)) {
      strings.push(` AND ${tableName}"createdAt" = ANY(ARRAY[`);
      for (let i = 0; i < where.createdAtIn.length; ++i) {
        values.push(where.createdAtIn[i]);
        if (i !== where.createdAtIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::timestamptz[])");
      if (where.createdAtIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.createdAtNotIn !== undefined) {
    if (isQueryPart(where.createdAtNotIn)) {
      strings.push(` AND ${tableName}"createdAt" != ANY(`, ")");
      values.push(where.createdAtNotIn, undefined);
    } else if (Array.isArray(where.createdAtNotIn)) {
      strings.push(` AND NOT (${tableName}"createdAt" = ANY(ARRAY[`);
      for (let i = 0; i < where.createdAtNotIn.length; ++i) {
        values.push(where.createdAtNotIn[i]);
        if (i !== where.createdAtNotIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::timestamptz[]))");
      if (where.createdAtNotIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.createdAtGreaterThan !== undefined) {
    strings.push(` AND ${tableName}"createdAt" > `);
    values.push(where.createdAtGreaterThan);
  }
  if (where.createdAtLowerThan !== undefined) {
    strings.push(` AND ${tableName}"createdAt" < `);
    values.push(where.createdAtLowerThan);
  }
  if (where.createdAtIsNull !== undefined) {
    strings.push(` AND ${tableName}"createdAt" IS NULL `);
    values.push(undefined);
  }
  if (where.createdAtIsNotNull !== undefined) {
    strings.push(` AND ${tableName}"createdAt" IS NOT NULL `);
    values.push(undefined);
  }
  if (where.updatedAt !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" = `);
    values.push(where.updatedAt);
  }
  if (where.updatedAtNotEqual !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" != `);
    values.push(where.updatedAtNotEqual);
  }
  if (where.updatedAtIn !== undefined) {
    if (isQueryPart(where.updatedAtIn)) {
      strings.push(` AND ${tableName}"updatedAt" = ANY(`, ")");
      values.push(where.updatedAtIn, undefined);
    } else if (Array.isArray(where.updatedAtIn)) {
      strings.push(` AND ${tableName}"updatedAt" = ANY(ARRAY[`);
      for (let i = 0; i < where.updatedAtIn.length; ++i) {
        values.push(where.updatedAtIn[i]);
        if (i !== where.updatedAtIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::timestamptz[])");
      if (where.updatedAtIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.updatedAtNotIn !== undefined) {
    if (isQueryPart(where.updatedAtNotIn)) {
      strings.push(` AND ${tableName}"updatedAt" != ANY(`, ")");
      values.push(where.updatedAtNotIn, undefined);
    } else if (Array.isArray(where.updatedAtNotIn)) {
      strings.push(` AND NOT (${tableName}"updatedAt" = ANY(ARRAY[`);
      for (let i = 0; i < where.updatedAtNotIn.length; ++i) {
        values.push(where.updatedAtNotIn[i]);
        if (i !== where.updatedAtNotIn.length - 1) {
          strings.push(", ");
        }
      }
      strings.push("]::timestamptz[]))");
      if (where.updatedAtNotIn.length === 0) {
        values.push(undefined);
      }
      values.push(undefined);
    }
  }
  if (where.updatedAtGreaterThan !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" > `);
    values.push(where.updatedAtGreaterThan);
  }
  if (where.updatedAtLowerThan !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" < `);
    values.push(where.updatedAtLowerThan);
  }
  if (where.updatedAtIsNull !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" IS NULL `);
    values.push(undefined);
  }
  if (where.updatedAtIsNotNull !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" IS NOT NULL `);
    values.push(undefined);
  }
  strings.push("");
  return query(strings, ...values);
}
/**
 * Build 'ORDER BY ' part for session
 *
 * @param {StoreSessionOrderBy} [orderBy=["createdAt", "updatedAt", "id"]]
 * @param {StoreSessionOrderBySpec} [orderBySpec={}]
 * @param {string} [tableName="s."]
 * @param {{ skipValidator?: boolean|undefined }} [options={}]
 * @returns {QueryPart}
 */
export function sessionOrderBy(
  orderBy = ["createdAt", "updatedAt", "id"],
  orderBySpec = {},
  tableName = "s.",
  options = {},
) {
  if (tableName.length > 0 && !tableName.endsWith(".")) {
    tableName = `${tableName}.`;
  }
  if (!options.skipValidator) {
    orderBy = validateStoreSessionOrderBy(orderBy, "$.StoreSessionOrderBy");
    orderBySpec = validateStoreSessionOrderBySpec(
      orderBySpec,
      "$.StoreSessionOrderBySpec",
    );
  }
  if (isQueryPart(orderBy)) {
    return orderBy;
  }
  const strings = [];
  const values = [];
  let i = 0;
  for (const value of orderBy) {
    if (i !== 0) {
      strings.push(", ");
      values.push(undefined);
    }
    i++;
    strings.push(`${tableName}"${value}" `, orderBySpec[value] ?? "ASC");
    values.push(undefined, undefined);
  }
  strings.push("");
  return query(strings, ...values);
}
/**
 * Build 'VALUES ' part for session
 *
 * @param {StoreSessionInsertPartial|StoreSessionInsertPartial[]} insert
 * @param {{ includePrimaryKey: boolean }} [options={}]
 * @returns {QueryPart}
 */
export function sessionInsertValues(insert, options = {}) {
  if (!Array.isArray(insert)) {
    insert = [insert];
  }
  const q = query``;
  for (let i = 0; i < insert.length; ++i) {
    const it = insert[i];
    checkFieldsInSet("session", "insert", sessionFieldSet, it);
    q.append(query`(
${options?.includePrimaryKey ? query`${it.id}, ` : undefined}
${it.expires ?? null}, ${JSON.stringify(it.data ?? {})}, ${
      it.createdAt ?? new Date()
    }, ${it.updatedAt ?? new Date()}
)`);
    if (i !== insert.length - 1) {
      q.append(query`, `);
    }
  }
  return q;
}
/**
 * Build 'SET ' part for session
 *
 * @param {StoreSessionUpdatePartial} update
 * @returns {QueryPart}
 */
export function sessionUpdateSet(update) {
  const strings = [];
  const values = [];
  checkFieldsInSet("session", "update", sessionFieldSet, update);
  if (update.expires !== undefined) {
    strings.push(`, "expires" = `);
    values.push(update.expires ?? null);
  }
  if (update.data !== undefined) {
    strings.push(`, "data" = `);
    values.push(JSON.stringify(update.data ?? {}));
  }
  if (update.createdAt !== undefined) {
    strings.push(`, "createdAt" = `);
    values.push(update.createdAt ?? new Date());
  }
  strings.push(`, "updatedAt" = `);
  values.push(new Date());
  // Remove the comma suffix
  strings[0] = strings[0].substring(2);
  strings.push("");
  return query(strings, ...values);
}
/**
 * @param {string} entity
 * @param {string} subType
 * @param {Set} set
 * @param {*} value
 */
function checkFieldsInSet(entity, subType, set, value) {
  if (isStaging()) {
    for (const key of Object.keys(value)) {
      if (!set.has(key) && value[key] !== undefined) {
        throw new AppError(`query.${entity}.${subType}Fields`, 500, {
          extraKey: key,
          knownKeys: [...set],
        });
      }
    }
  }
}
/**
 * @param {Postgres} sql
 * @param {StoreSessionWhere} [where]
 * @returns {Promise<StoreSession[]>}
 */
async function sessionSelect(sql, where) {
  return await querySession({ where }).exec(sql);
}
/**
 * @param {Postgres} sql
 * @param {StoreSessionWhere} [where]
 * @returns {Promise<number>}
 */
async function sessionCount(sql, where) {
  const [result] = await query`
SELECT COUNT(s."id") as "countResult"
FROM "session" s
WHERE ${sessionWhere(where)}
`.exec(sql);
  return Number(result?.countResult ?? "0");
}
/**
 * @param {Postgres} sql
 * @param {StoreSessionWhere} [where={}]
 * @returns {Promise<void>}
 */
async function sessionDelete(sql, where = {}) {
  return await query`
DELETE FROM "session" s
WHERE ${sessionWhere(where)}
`.exec(sql);
}
/**
 * @param {Postgres} sql
 * @param {StoreSessionInsertPartial|(StoreSessionInsertPartial[])} insert
 * @param {{ withPrimaryKey: boolean }} [options={}]
 * @returns {Promise<StoreSession[]>}
 */
async function sessionInsert(sql, insert, options = {}) {
  if (insert === undefined || insert.length === 0) {
    return [];
  }
  options.withPrimaryKey = options.withPrimaryKey ?? false;
  const result = await query`
INSERT INTO "session" (${sessionFields("", {
    excludePrimaryKey: !options.withPrimaryKey,
  })})
VALUES ${sessionInsertValues(insert, {
    includePrimaryKey: options.withPrimaryKey,
  })}
RETURNING ${sessionFields("")}
`.exec(sql);
  transformSession(result);
  return result;
}
/**
 * @param {Postgres} sql
 * @param {StoreSessionUpdatePartial} update
 * @param {StoreSessionWhere} [where={}]
 * @returns {Promise<StoreSession[]>}
 */
async function sessionUpdate(sql, update, where = {}) {
  const result = await query`
UPDATE "session" s
SET ${sessionUpdateSet(update)}
WHERE ${sessionWhere(where)}
RETURNING ${sessionFields()}
`.exec(sql);
  transformSession(result);
  return result;
}
export const sessionQueries = {
  sessionSelect,
  sessionCount,
  sessionDelete,
  sessionInsert,
  sessionUpdate,
};
/**
 * @param {StoreSessionQueryBuilder|StoreSessionQueryTraverser} [builder={}]
 * @param {QueryPart} wherePartial
 * @returns {QueryPart}
 */
export function internalQuerySession(builder = {}, wherePartial) {
  const joinQb = query``;
  return query`
FROM "session" s
${joinQb}
WHERE ${sessionWhere(builder.where, "s.", {
    skipValidator: true,
  })} ${wherePartial}
`;
}
/**
 * @typedef {StoreSession} QueryResultStoreSession
 */
/**
 * Query Builder for session
 * Note that nested limit and offset don't work yet.
 *
 * @param {StoreSessionQueryBuilder} [builder={}]
 * @returns {{
 *  exec: function(sql: Postgres): Promise<QueryResultStoreSession[]>,
 *  execRaw: function(sql: Postgres): Promise<*[]>
 *  queryPart: QueryPart,
 * }}
 */
export function querySession(builder = {}) {
  const joinedKeys = [];
  validateStoreSessionQueryBuilder(builder, "$.sessionBuilder");
  const qb = query`
SELECT to_jsonb(s.*) || jsonb_build_object(${query([
    joinedKeys.join(","),
  ])}) as "result"
${internalQuerySession(builder)}
ORDER BY ${sessionOrderBy(builder.orderBy, builder.orderBySpec)}
`;
  if (!isNil(builder.offset)) {
    qb.append(query`OFFSET ${builder.offset}`);
  }
  if (!isNil(builder.limit)) {
    qb.append(query`FETCH NEXT ${builder.limit} ROWS ONLY`);
  }
  return {
    then: () => {
      throw AppError.serverError({
        message:
          "Awaited 'querySession' directly. Please use '.exec' or '.execRaw'.",
      });
    },
    execRaw: async (sql) => await qb.exec(sql),
    exec: async (sql) => {
      const result = await qb.exec(sql);
      transformSession(result, builder);
      return result;
    },
    get queryPart() {
      return qb;
    },
  };
}
/**
 * NOTE: At the moment only intended for internal use by the generated queries!
 *
 * Transform results from the query builder that adhere to the known structure
 * of 'session' and its relations.
 *
 * @param {*[]} values
 * @param {StoreSessionQueryBuilder} [builder={}]
 */
export function transformSession(values, builder = {}) {
  for (let i = 0; i < values.length; ++i) {
    let value = values[i];
    if (isPlainObject(value.result) && Object.keys(value).length === 1) {
      values[i] = value.result;
      value = value.result;
    }
    if (typeof value.expires === "string") {
      value.expires = new Date(value.expires);
    }
    if (typeof value.createdAt === "string") {
      value.createdAt = new Date(value.createdAt);
    }
    if (typeof value.updatedAt === "string") {
      value.updatedAt = new Date(value.updatedAt);
    }
  }
}
