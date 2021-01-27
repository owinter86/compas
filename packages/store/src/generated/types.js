// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

// An export soo all things work correctly with linters, ts, ...
export const __generated__ = true;
/**
 * @typedef {import("@compas/code-gen").App} App
 */
/**
 * @typedef {import("@compas/code-gen").TypeCreator} TypeCreator
 */
/**
 * @typedef {import("@compas/code-gen").RouteCreator} RouteCreator
 */
/**
 * @typedef {import("@compas/store").Postgres} Postgres
 */
/**
 * @typedef import("@compas/store").QueryPart} QueryPart
 */
/**
 * @typedef import("@compas/store").Minio} Minio
 */
/**
 * @typedef {{"bucketName": string, "contentLength": number, "contentType": string, "name": string, "meta": StoreFileMeta, "id": string, "createdAt": Date, "updatedAt": Date, "deletedAt"?: Date, }} StoreFile
 */
/**
 * User definable, optional object to store whatever you want
 * @typedef {{}} StoreFileMeta
 */
/**
 * @typedef {{"name"?: string, "order": number, "meta": StoreFileGroupMeta, "id": string, "file"?: string, "parent"?: string, "createdAt": Date, "updatedAt": Date, "deletedAt"?: Date, }} StoreFileGroup
 */
/**
 * User definable, optional object to store whatever you want
 * @typedef {StoreFileMeta} StoreFileGroupMeta
 */
/**
 * @typedef {{"name"?: string, "order": number, "meta": StoreFileGroupMeta, "isDirectory": boolean, "id": string, "file"?: string, "parent"?: string, "createdAt": Date, "updatedAt": Date, "deletedAt"?: Date, }} StoreFileGroupView
 */
/**
 * @typedef {{"id": number, "isComplete": boolean, "priority": number, "scheduledAt": Date, "name": string, "data": *, "createdAt": Date, "updatedAt": Date, }} StoreJob
 */
/**
 * @typedef {{"years"?: number, "months"?: number, "days"?: number, "hours"?: number, "minutes"?: number, "seconds"?: number, }} StoreJobInterval
 */
/**
 * @typedef {{"expires": Date, "data": *, "id": string, "createdAt": Date, "updatedAt": Date, }} StoreSession
 */
/**
 * @typedef {{"$raw"?: QueryPart, "$or"?: (StoreFileWhere)[], "id"?: string, "idNotEqual"?: string, "idIn"?: (string)[]|QueryPart, "idNotIn"?: (string)[]|QueryPart, "idLike"?: string, "idNotLike"?: string, "bucketName"?: string, "bucketNameNotEqual"?: string, "bucketNameIn"?: (string)[]|QueryPart, "bucketNameNotIn"?: (string)[]|QueryPart, "bucketNameLike"?: string, "bucketNameILike"?: string, "bucketNameNotLike"?: string, "createdAt"?: Date, "createdAtNotEqual"?: Date, "createdAtIn"?: (Date)[]|QueryPart, "createdAtNotIn"?: (Date)[]|QueryPart, "createdAtGreaterThan"?: Date, "createdAtLowerThan"?: Date, "createdAtIsNull"?: boolean, "createdAtIsNotNull"?: boolean, "updatedAt"?: Date, "updatedAtNotEqual"?: Date, "updatedAtIn"?: (Date)[]|QueryPart, "updatedAtNotIn"?: (Date)[]|QueryPart, "updatedAtGreaterThan"?: Date, "updatedAtLowerThan"?: Date, "updatedAtIsNull"?: boolean, "updatedAtIsNotNull"?: boolean, "deletedAt"?: Date, "deletedAtNotEqual"?: Date, "deletedAtIn"?: (Date)[]|QueryPart, "deletedAtNotIn"?: (Date)[]|QueryPart, "deletedAtGreaterThan"?: Date, "deletedAtLowerThan"?: Date, "deletedAtIncludeNotNull"?: boolean, }} StoreFileWhere
 */
/**
 * @typedef {{"$raw"?: QueryPart, "$or"?: (StoreFileGroupWhere)[], "id"?: string, "idNotEqual"?: string, "idIn"?: (string)[]|QueryPart, "idNotIn"?: (string)[]|QueryPart, "idLike"?: string, "idNotLike"?: string, "file"?: string, "fileNotEqual"?: string, "fileIn"?: (string)[]|QueryPart, "fileNotIn"?: (string)[]|QueryPart, "fileLike"?: string, "fileNotLike"?: string, "fileIsNull"?: boolean, "fileIsNotNull"?: boolean, "parent"?: string, "parentNotEqual"?: string, "parentIn"?: (string)[]|QueryPart, "parentNotIn"?: (string)[]|QueryPart, "parentLike"?: string, "parentNotLike"?: string, "parentIsNull"?: boolean, "parentIsNotNull"?: boolean, "createdAt"?: Date, "createdAtNotEqual"?: Date, "createdAtIn"?: (Date)[]|QueryPart, "createdAtNotIn"?: (Date)[]|QueryPart, "createdAtGreaterThan"?: Date, "createdAtLowerThan"?: Date, "createdAtIsNull"?: boolean, "createdAtIsNotNull"?: boolean, "updatedAt"?: Date, "updatedAtNotEqual"?: Date, "updatedAtIn"?: (Date)[]|QueryPart, "updatedAtNotIn"?: (Date)[]|QueryPart, "updatedAtGreaterThan"?: Date, "updatedAtLowerThan"?: Date, "updatedAtIsNull"?: boolean, "updatedAtIsNotNull"?: boolean, "deletedAt"?: Date, "deletedAtNotEqual"?: Date, "deletedAtIn"?: (Date)[]|QueryPart, "deletedAtNotIn"?: (Date)[]|QueryPart, "deletedAtGreaterThan"?: Date, "deletedAtLowerThan"?: Date, "deletedAtIncludeNotNull"?: boolean, }} StoreFileGroupWhere
 */
/**
 * @typedef {{"$raw"?: QueryPart, "$or"?: (StoreFileGroupViewWhere)[], "id"?: string, "idNotEqual"?: string, "idIn"?: (string)[]|QueryPart, "idNotIn"?: (string)[]|QueryPart, "idLike"?: string, "idNotLike"?: string, "isDirectory"?: boolean, "file"?: string, "fileNotEqual"?: string, "fileIn"?: (string)[]|QueryPart, "fileNotIn"?: (string)[]|QueryPart, "fileLike"?: string, "fileNotLike"?: string, "fileIsNull"?: boolean, "fileIsNotNull"?: boolean, "parent"?: string, "parentNotEqual"?: string, "parentIn"?: (string)[]|QueryPart, "parentNotIn"?: (string)[]|QueryPart, "parentLike"?: string, "parentNotLike"?: string, "parentIsNull"?: boolean, "parentIsNotNull"?: boolean, "createdAt"?: Date, "createdAtNotEqual"?: Date, "createdAtIn"?: (Date)[]|QueryPart, "createdAtNotIn"?: (Date)[]|QueryPart, "createdAtGreaterThan"?: Date, "createdAtLowerThan"?: Date, "createdAtIsNull"?: boolean, "createdAtIsNotNull"?: boolean, "updatedAt"?: Date, "updatedAtNotEqual"?: Date, "updatedAtIn"?: (Date)[]|QueryPart, "updatedAtNotIn"?: (Date)[]|QueryPart, "updatedAtGreaterThan"?: Date, "updatedAtLowerThan"?: Date, "updatedAtIsNull"?: boolean, "updatedAtIsNotNull"?: boolean, "deletedAt"?: Date, "deletedAtNotEqual"?: Date, "deletedAtIn"?: (Date)[]|QueryPart, "deletedAtNotIn"?: (Date)[]|QueryPart, "deletedAtGreaterThan"?: Date, "deletedAtLowerThan"?: Date, "deletedAtIncludeNotNull"?: boolean, }} StoreFileGroupViewWhere
 */
/**
 * @typedef {{"$raw"?: QueryPart, "$or"?: (StoreJobWhere)[], "id"?: number, "idNotEqual"?: number, "idIn"?: (number)[]|QueryPart, "idNotIn"?: (number)[]|QueryPart, "idGreaterThan"?: number, "idLowerThan"?: number, "isComplete"?: boolean, "isCompleteIsNull"?: boolean, "isCompleteIsNotNull"?: boolean, "name"?: string, "nameNotEqual"?: string, "nameIn"?: (string)[]|QueryPart, "nameNotIn"?: (string)[]|QueryPart, "nameLike"?: string, "nameILike"?: string, "nameNotLike"?: string, "scheduledAt"?: Date, "scheduledAtNotEqual"?: Date, "scheduledAtIn"?: (Date)[]|QueryPart, "scheduledAtNotIn"?: (Date)[]|QueryPart, "scheduledAtGreaterThan"?: Date, "scheduledAtLowerThan"?: Date, "scheduledAtIsNull"?: boolean, "scheduledAtIsNotNull"?: boolean, "createdAt"?: Date, "createdAtNotEqual"?: Date, "createdAtIn"?: (Date)[]|QueryPart, "createdAtNotIn"?: (Date)[]|QueryPart, "createdAtGreaterThan"?: Date, "createdAtLowerThan"?: Date, "createdAtIsNull"?: boolean, "createdAtIsNotNull"?: boolean, "updatedAt"?: Date, "updatedAtNotEqual"?: Date, "updatedAtIn"?: (Date)[]|QueryPart, "updatedAtNotIn"?: (Date)[]|QueryPart, "updatedAtGreaterThan"?: Date, "updatedAtLowerThan"?: Date, "updatedAtIsNull"?: boolean, "updatedAtIsNotNull"?: boolean, }} StoreJobWhere
 */
/**
 * @typedef {{"$raw"?: QueryPart, "$or"?: (StoreSessionWhere)[], "id"?: string, "idNotEqual"?: string, "idIn"?: (string)[]|QueryPart, "idNotIn"?: (string)[]|QueryPart, "idLike"?: string, "idNotLike"?: string, "expires"?: Date, "expiresNotEqual"?: Date, "expiresIn"?: (Date)[]|QueryPart, "expiresNotIn"?: (Date)[]|QueryPart, "expiresGreaterThan"?: Date, "expiresLowerThan"?: Date, "createdAt"?: Date, "createdAtNotEqual"?: Date, "createdAtIn"?: (Date)[]|QueryPart, "createdAtNotIn"?: (Date)[]|QueryPart, "createdAtGreaterThan"?: Date, "createdAtLowerThan"?: Date, "createdAtIsNull"?: boolean, "createdAtIsNotNull"?: boolean, "updatedAt"?: Date, "updatedAtNotEqual"?: Date, "updatedAtIn"?: (Date)[]|QueryPart, "updatedAtNotIn"?: (Date)[]|QueryPart, "updatedAtGreaterThan"?: Date, "updatedAtLowerThan"?: Date, "updatedAtIsNull"?: boolean, "updatedAtIsNotNull"?: boolean, }} StoreSessionWhere
 */
/**
 * @typedef {{"id"?: string, "contentLength": number, "bucketName": string, "contentType": string, "name": string, "meta"?: {}, "createdAt"?: Date, "updatedAt"?: Date, "deletedAt"?: Date, }} StoreFileInsertPartial
 */
/**
 * @typedef {{"contentLength"?: number, "bucketName"?: string, "contentType"?: string, "name"?: string, "meta"?: {}, "createdAt"?: Date, "updatedAt"?: Date, "deletedAt"?: Date, }} StoreFileUpdatePartial
 */
/**
 * @typedef {{"id"?: string, "order"?: number, "file"?: string, "parent"?: string, "name"?: string, "meta"?: {}, "createdAt"?: Date, "updatedAt"?: Date, "deletedAt"?: Date, }} StoreFileGroupInsertPartial
 */
/**
 * @typedef {{"order"?: number, "file"?: string, "parent"?: string, "name"?: string, "meta"?: {}, "createdAt"?: Date, "updatedAt"?: Date, "deletedAt"?: Date, }} StoreFileGroupUpdatePartial
 */
/**
 * @typedef {{"id"?: number, "isComplete"?: boolean, "priority"?: number, "name": string, "scheduledAt"?: Date, "data"?: *, "createdAt"?: Date, "updatedAt"?: Date, }} StoreJobInsertPartial
 */
/**
 * @typedef {{"isComplete"?: boolean, "priority"?: number, "name"?: string, "scheduledAt"?: Date, "data"?: *, "createdAt"?: Date, "updatedAt"?: Date, }} StoreJobUpdatePartial
 */
/**
 * @typedef {{"id"?: string, "expires": Date, "data"?: *, "createdAt"?: Date, "updatedAt"?: Date, }} StoreSessionInsertPartial
 */
/**
 * @typedef {{"expires"?: Date, "data"?: *, "createdAt"?: Date, "updatedAt"?: Date, }} StoreSessionUpdatePartial
 */
/**
 * @typedef {{"where"?: StoreFileWhere, "as"?: string, "limit"?: number, "offset"?: number, "group"?: StoreFileGroupQueryBuilder, "viaGroup"?: StoreFileGroupQueryTraverser, "groupView"?: StoreFileGroupViewQueryBuilder, "viaGroupView"?: StoreFileGroupViewQueryTraverser, }} StoreFileQueryBuilder
 */
/**
 * @typedef {{"where"?: StoreFileGroupWhere, "as"?: string, "limit"?: number, "offset"?: number, "file"?: StoreFileQueryBuilder, "viaFile"?: StoreFileQueryTraverser, "parent"?: StoreFileGroupQueryBuilder, "viaParent"?: StoreFileGroupQueryTraverser, "children"?: StoreFileGroupQueryBuilder, "viaChildren"?: StoreFileGroupQueryTraverser, }} StoreFileGroupQueryBuilder
 */
/**
 * @typedef {{"where"?: StoreFileWhere, "limit"?: number, "offset"?: number, "viaGroup"?: StoreFileGroupQueryTraverser, "viaGroupView"?: StoreFileGroupViewQueryTraverser, }} StoreFileQueryTraverser
 */
/**
 * @typedef {{"where"?: StoreFileGroupWhere, "limit"?: number, "offset"?: number, "viaFile"?: StoreFileQueryTraverser, "viaParent"?: StoreFileGroupQueryTraverser, "viaChildren"?: StoreFileGroupQueryTraverser, }} StoreFileGroupQueryTraverser
 */
/**
 * @typedef {{"where"?: StoreFileGroupViewWhere, "limit"?: number, "offset"?: number, "viaFile"?: StoreFileQueryTraverser, "viaParent"?: StoreFileGroupViewQueryTraverser, "viaChildren"?: StoreFileGroupViewQueryTraverser, }} StoreFileGroupViewQueryTraverser
 */
/**
 * @typedef {{"where"?: StoreFileGroupViewWhere, "as"?: string, "limit"?: number, "offset"?: number, "file"?: StoreFileQueryBuilder, "viaFile"?: StoreFileQueryTraverser, "parent"?: StoreFileGroupViewQueryBuilder, "viaParent"?: StoreFileGroupViewQueryTraverser, "children"?: StoreFileGroupViewQueryBuilder, "viaChildren"?: StoreFileGroupViewQueryTraverser, }} StoreFileGroupViewQueryBuilder
 */
/**
 * @typedef {{"where"?: StoreJobWhere, "as"?: string, "limit"?: number, "offset"?: number, }} StoreJobQueryBuilder
 */
/**
 * @typedef {{"where"?: StoreJobWhere, "limit"?: number, "offset"?: number, }} StoreJobQueryTraverser
 */
/**
 * @typedef {{"where"?: StoreSessionWhere, "as"?: string, "limit"?: number, "offset"?: number, }} StoreSessionQueryBuilder
 */
/**
 * @typedef {{"where"?: StoreSessionWhere, "limit"?: number, "offset"?: number, }} StoreSessionQueryTraverser
 */
