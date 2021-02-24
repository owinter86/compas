// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

export const storeStructureString =
  '{"jobInterval":{"type":"object","group":"store","name":"jobInterval","docString":"","isOptional":false,"validator":{"strict":true},"keys":{"years":{"type":"number","docString":"","isOptional":true,"validator":{"convert":false,"floatingPoint":false}},"months":{"type":"number","docString":"","isOptional":true,"validator":{"convert":false,"floatingPoint":false}},"days":{"type":"number","docString":"","isOptional":true,"validator":{"convert":false,"floatingPoint":false}},"hours":{"type":"number","docString":"","isOptional":true,"validator":{"convert":false,"floatingPoint":false}},"minutes":{"type":"number","docString":"","isOptional":true,"validator":{"convert":false,"floatingPoint":false}},"seconds":{"type":"number","docString":"","isOptional":true,"validator":{"convert":false,"floatingPoint":false}}},"relations":[],"uniqueName":"StoreJobInterval"},"file":{"type":"object","group":"store","name":"file","docString":"","isOptional":false,"validator":{"strict":true},"enableQueries":true,"queryOptions":{"withSoftDeletes":true,"withPrimaryKey":true},"keys":{"bucketName":{"type":"string","docString":"","isOptional":false,"validator":{"convert":false,"trim":false,"lowerCase":false,"upperCase":false,"min":1},"sql":{"searchable":true}},"contentLength":{"type":"number","docString":"","isOptional":false,"validator":{"convert":false,"floatingPoint":false}},"contentType":{"type":"string","docString":"","isOptional":false,"validator":{"convert":false,"trim":false,"lowerCase":false,"upperCase":false,"min":1}},"name":{"type":"string","docString":"","isOptional":false,"validator":{"convert":false,"trim":false,"lowerCase":false,"upperCase":false,"min":1}},"meta":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"fileMeta","uniqueName":"StoreFileMeta"}}},"relations":[],"uniqueName":"StoreFile"},"fileGroup":{"type":"object","group":"store","name":"fileGroup","docString":"","isOptional":false,"validator":{"strict":true},"enableQueries":true,"queryOptions":{"withSoftDeletes":true,"withPrimaryKey":true},"keys":{"name":{"type":"string","docString":"","isOptional":true,"validator":{"convert":false,"trim":false,"lowerCase":false,"upperCase":false,"min":1}},"order":{"type":"number","docString":"Hack to get an increasing integer by default","isOptional":true,"defaultValue":"Math.floor(Date.now() / 1000000)","validator":{"convert":false,"floatingPoint":false},"sql":{"searchable":true}},"meta":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"fileGroupMeta","uniqueName":"StoreFileGroupMeta"}}},"relations":[{"type":"relation","subType":"oneToOne","ownKey":"file","referencedKey":"group","isOptional":true,"reference":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"file","uniqueName":"StoreFile"}}},{"type":"relation","subType":"manyToOne","ownKey":"parent","referencedKey":"children","isOptional":true,"reference":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"fileGroup","uniqueName":"StoreFileGroup"}}},{"type":"relation","subType":"oneToMany","ownKey":"children","reference":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"fileGroup","uniqueName":"StoreFileGroup"}}}],"uniqueName":"StoreFileGroup"},"fileGroupView":{"type":"object","group":"store","name":"fileGroupView","docString":"","isOptional":false,"validator":{"strict":true},"enableQueries":true,"queryOptions":{"withSoftDeletes":true,"isView":true,"withPrimaryKey":true},"keys":{"name":{"type":"string","docString":"","isOptional":true,"validator":{"convert":false,"trim":false,"lowerCase":false,"upperCase":false,"min":1}},"order":{"type":"number","docString":"","isOptional":false,"validator":{"convert":false,"floatingPoint":false}},"meta":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"fileGroupMeta","uniqueName":"StoreFileGroupMeta"}},"isDirectory":{"type":"boolean","docString":"","isOptional":false,"validator":{"convert":false},"sql":{"searchable":true}}},"relations":[{"type":"relation","subType":"oneToOne","ownKey":"file","referencedKey":"groupView","isOptional":true,"reference":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"file","uniqueName":"StoreFile"}}},{"type":"relation","subType":"manyToOne","ownKey":"parent","referencedKey":"children","isOptional":true,"reference":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"fileGroupView","uniqueName":"StoreFileGroupView"}}},{"type":"relation","subType":"oneToMany","ownKey":"children","reference":{"type":"reference","docString":"","isOptional":false,"validator":{},"reference":{"group":"store","name":"fileGroupView","uniqueName":"StoreFileGroupView"}}}],"uniqueName":"StoreFileGroupView"},"session":{"type":"object","group":"store","name":"session","docString":"","isOptional":false,"validator":{"strict":true},"enableQueries":true,"queryOptions":{"withDates":true,"withPrimaryKey":true},"keys":{"expires":{"type":"date","docString":"","isOptional":false,"validator":{},"sql":{"searchable":true}},"data":{"type":"any","docString":"","isOptional":true,"defaultValue":"{}","validator":{},"rawValueImport":{},"rawValidatorImport":{}}},"relations":[],"uniqueName":"StoreSession"},"job":{"type":"object","group":"store","name":"job","docString":"","isOptional":false,"validator":{"strict":true},"enableQueries":true,"queryOptions":{"withDates":true,"withPrimaryKey":true},"keys":{"id":{"type":"number","docString":"","isOptional":false,"validator":{"convert":false,"floatingPoint":false},"sql":{"searchable":true,"primary":true}},"isComplete":{"type":"boolean","docString":"","isOptional":true,"defaultValue":"false","validator":{"convert":false},"sql":{"searchable":true}},"priority":{"type":"number","docString":"","isOptional":true,"defaultValue":"0","validator":{"convert":false,"floatingPoint":false}},"scheduledAt":{"type":"date","docString":"","isOptional":true,"defaultValue":"(new Date())","validator":{},"sql":{"searchable":true}},"name":{"type":"string","docString":"","isOptional":false,"validator":{"convert":false,"trim":false,"lowerCase":false,"upperCase":false,"min":1},"sql":{"searchable":true}},"data":{"type":"any","docString":"","isOptional":true,"defaultValue":"{}","validator":{},"rawValueImport":{},"rawValidatorImport":{}},"retryCount":{"type":"number","docString":"","isOptional":true,"defaultValue":"0","validator":{"convert":false,"floatingPoint":false}}},"relations":[],"uniqueName":"StoreJob"},"fileMeta":{"type":"object","group":"store","name":"fileMeta","docString":"User definable, optional object to store whatever you want","isOptional":true,"defaultValue":"{}","validator":{"strict":true},"keys":{},"relations":[],"uniqueName":"StoreFileMeta"},"fileGroupMeta":{"type":"object","group":"store","name":"fileGroupMeta","docString":"User definable, optional object to store whatever you want","isOptional":true,"defaultValue":"{}","validator":{"strict":true},"keys":{},"relations":[],"uniqueName":"StoreFileGroupMeta"}}';
export const storeStructure = JSON.parse(storeStructureString);
export const structure = Object.assign({}, { store: storeStructure });
export const structureString = JSON.stringify(structure);
