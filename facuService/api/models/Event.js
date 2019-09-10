/**
 * Event.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
//https://stackoverflow.com/questions/19156137/many-to-many-relationship-in-sails

module.exports = {

  attributes: {

    name: {
      type: 'string',
      maxLength: 200,
      columnType: 'character varying(200)',
      required: true
    },

    description: {
      type: 'string',
    },

    publishDate: {
      type: 'ref',
      columnType: 'date',
      columnName: 'publish_date',
      defaultsTo: new Date(),
    },

    eventDate: {
      type: 'ref',
      columnType: 'timestamp',
      columnName: 'event_date',
      example: '2019-01-10 10:30',
      required: true
    },
    
    wasNotificated: {
      type:'boolean',
      columnName: 'was_notificated',
      defaultsTo: false,
    },

    image: {
      type: 'string',
      maxLength: 150,
      columnType: 'character varying(150)',
      required: true
    },
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    activities: {
      collection: 'activity',
      via: 'event'
    },


  },
  attended: { //asisten
    collection: 'user',
    via: 'attends', //asiste
    through: 'attendance' //asistencia
  }
};

