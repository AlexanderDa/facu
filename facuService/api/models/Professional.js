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

  format: function (professional) {
    var professionalObject = {}
    if (Array.isArray(professional) === true) {
      professionalObject = []
      professional.forEach(element => {

        professionalObject.push({
          id: element.id,
          fullName: `${element.lastName} ${element.firstName}`,
          lastName: element.lastName,
          firstName: element.firstName,
          education: element.education,
          collegeDegree: element.collegeDegree,
          specialization: element.specialization,
          experience: element.experience,
          image: element.image,
          works: element.works
        })
      });
    } else {
      professionalObject = {
        id: professional.id,
        fullName: `${professional.lastName} ${professional.firstName}`,
        lastName: professional.lastName,
        firstName: professional.firstName,
        education: professional.education,
        collegeDegree: professional.collegeDegree,
        specialization: professional.specialization,
        experience: professional.experience,
        image: professional.image,
        works: professional.works
      }
    }
    return professionalObject
  }
};

