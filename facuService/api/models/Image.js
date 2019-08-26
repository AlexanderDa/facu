/**
 * Image.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    field: {
      type: 'string',
      maxLength: 10,
      columnType: 'character varying(10)',
    },

    type: {
      type: 'string',
      maxLength: 15,
      columnType: 'character varying(15)',
      required: true
    },

    fd: {
      type: 'string',
      maxLength: 120,
      columnType: 'character varying(120)',
      required: true
    }
  },

};

