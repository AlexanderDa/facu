/**
 * Professional.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    lastName: {
      type: 'string',
      required: true,
      maxLength: 50,
      columnType: 'character varying(50)',
      columnName: 'last_name'
    },

    firstName: {
      type: 'string',
      required: true,
      maxLength: 50,
      columnType: 'character varying(50)',
      columnName: 'first_name'
    },

    education: {
      type: 'string',
      maxLength: 250,
      columnType: 'character varying(250)',
      required: true,
    },

    collegeDegree: {
      type: 'string',
      maxLength: 250,
      columnType: 'character varying(250)',
      columnName: 'college_degree'
    },

    specialization: {
      type: 'string',
      maxLength: 100,
      columnType: 'character varying(100)',
    },

    experience: {
      type: 'number',
      columnType: 'integer',
    },

    image: {
      type: 'string',
      maxLength: 150,
      columnType: 'character varying(150)'
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

    works: {
      collection: 'work',
      via: 'professional'
    },


  },

};

