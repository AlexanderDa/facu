/**
 * Activity.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      maxLength: 200,
      columnType: 'character varying(200)',
      required: true
    },
    place: {
      type: 'string',
      maxLength: 250,
      columnType: 'character varying(250)',
    },
    startTime: {
      type: 'string',
      maxLength: 5,
      columnType: 'character varying(5)',
      columnName: 'start_time',
      required: true
    },

    finishTime: {
      type: 'string',
      maxLength: 5,
      columnType: 'character varying(5)',
      columnName: 'finish_time',
      required: true
    },

    type: {
      type: 'ref',
      columnType: 'character varying(15)',
      maxLength: 15,
      isIn: ['conferencia', 'taller'],
      required: true
    },

    requireInscription: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'require_inscription',
    },

    quota: {
      type: 'number',
      columnType: 'integer',
      allowNull: true
    },

    registered: {
      type: 'number',
      columnType: 'integer',
      allowNull: true
    },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    event: {
      model: 'event',
      required: true
    },
    professional: {
      model: 'professional'
    },

  },

  score: {
    collection: 'user',
    via: 'qualifies',
    through: 'qualification'
  }
};

