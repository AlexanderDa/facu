/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //'/': { view: 'pages/homepage' },


  'GET        /file/image/:id': 'imageController.download',


  'GET        /api/v1/professionals': 'ProfessionalController.getAll',
  'GET        /api/v1/professional/:id': 'ProfessionalController.getById',
  'POST       /api/v1/professional': { controller: 'ProfessionalController', action: 'createNewProfessional' },
  'PUT        /api/v1/professional/:id': { controller: 'ProfessionalController', action: 'updateOneProfessional' },
  'DELETE     /api/v1/professional/:id': { controller: 'ProfessionalController', action: 'deleteOneProfessional' },

  'GET        /api/v1/works': 'WorkController.getAll',
  'GET        /api/v1/work/:id': 'WorkController.getById',
  'POST       /api/v1/work': { controller: 'WorkController', action: 'createNewWork' },
  'PUT        /api/v1/work/:id': { controller: 'WorkController', action: 'updateOneWork' },
  'DELETE     /api/v1/work/:id': { controller: 'WorkController', action: 'deleteOneWork' },


  'GET        /api/v1/events': 'EventController.getAll',
  'GET        /api/v1/events/history/:lastDate/:limit?': 'EventController.getByHistory',
  'GET        /api/v1/event/:id': 'EventController.getById',
  'POST       /api/v1/event': { controller: 'EventController', action: 'createNewEvent' },
  'PUT        /api/v1/event/:id': { controller: 'EventController', action: 'updateOneEvent' },
  'DELETE     /api/v1/event/:id': { controller: 'EventController', action: 'deleteOneEvent' },


  'GET        /api/v1/activities': 'ActivityController.getAll',
  'GET        /api/v1/activities/:eventId': 'ActivityController.getByEvent',
  'GET        /api/v1/activity/:id': 'ActivityController.getById',
  'POST       /api/v1/activity': { controller: 'ActivityController', action: 'createNewActivity' },
  'PUT        /api/v1/activity/:id': { controller: 'ActivityController', action: 'updateOneActivity' },
  'DELETE     /api/v1/activity/:id': { controller: 'ActivityController', action: 'deleteOneActivity' },


};
