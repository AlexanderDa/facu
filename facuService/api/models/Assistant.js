/**
 * Attendance.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'assistant',
  attributes: {
    event: {
      model: 'event',
      required: true,
    },
    user: {
      model: 'user',
      columnName:'userid',
      required: true,
    },
    score: {
      type: 'number',
      columnType: 'integer',
    },
  }
};

