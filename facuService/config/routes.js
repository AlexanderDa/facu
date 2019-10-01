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
  'PUT        /file/image/user': 'imageController.userAvatar',


  'GET        /api/v1/account/me': { controller: 'AccountController', action: 'me' },
  'POST       /api/v1/account/login': { controller: 'AccountController', action: 'login' },
  'PUT        /api/v1/account/logout': { controller: 'AccountController', action: 'logout' },
  'PUT        /api/v1/account/update/profile': { controller: 'AccountController', action: 'updateProfile' },
  'PUT        /api/v1/account/update/password': { controller: 'AccountController', action: 'updatePassword' },
  'POST       /api/v1/account/password/reset/token': { controller: 'AccountController', action: 'resetPassToken' },
  'POST       /api/v1/account/password/reset': { controller: 'AccountController', action: 'resetPass' },

  'GET        /api/v1/users': 'UserController.getAll',
  'GET        /api/v1/user/:id': 'UserController.getById',
  'POST       /api/v1/user/signup': { controller: 'UserController', action: 'createNewUser' },
  'DELETE     /api/v1/user/:id': { controller: 'UserController', action: 'deleteOneUser' },

  'GET        /api/v1/professionals': 'ProfessionalController.getAll',
  'GET        /api/v1/professional/:id': 'ProfessionalController.getById',
  'POST       /api/v1/professional': { controller: 'ProfessionalController', action: 'createNewProfessional' },
  'PUT        /api/v1/professional/:id': { controller: 'ProfessionalController', action: 'updateOneProfessional' },
  'DELETE     /api/v1/professional/:id': { controller: 'ProfessionalController', action: 'deleteOneProfessional' },

  'GET        /api/v1/works/:professionalId': 'WorkController.getAll',
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
  'GET        /api/v1/activities/event/:eventId': 'ActivityController.getByEvent',
  'GET        /api/v1/activity/:id': 'ActivityController.getById',
  'POST       /api/v1/activity': { controller: 'ActivityController', action: 'createNewActivity' },
  'PUT        /api/v1/activity/:id': { controller: 'ActivityController', action: 'updateOneActivity' },
  'DELETE     /api/v1/activity/:id': { controller: 'ActivityController', action: 'deleteOneActivity' },

  'GET        /api/v1/assistant/from/event/:eventId': 'AssistantController.getByEvent',
  'GET        /api/v1/assistant/from/logged': 'AssistantController.getByUserLogged',
  'POST       /api/v1/assistant': 'AssistantController.post',
  'PUT        /api/v1/assistant/:id/event/score': 'AssistantController.eventScore',

  'GET        /api/v1/score/from/activity/:activityId': 'ScoreSubscriptionController.getScoreFromAtivity',
  'GET        /api/v1/hasubscription/activity/:activityId': 'ScoreSubscriptionController.getHasSubscription',
  'GET        /api/v1/subscription/activity/logged': 'ScoreSubscriptionController.getSubscribedActivities',
  'POST       /api/v1/score/activity/:activityId': 'ScoreSubscriptionController.postScoreToAtivity',
  'GET        /api/v1/subscribers/from/activity/:activityId': 'ScoreSubscriptionController.getSubscribersFromAtivity',
  'POST       /api/v1/subscribe/activity/:activityId': 'ScoreSubscriptionController.postSubscriberToAtivity',


  'POST       /api/v1/socket/connect': { controller: 'SocketController', action: 'onConnect' },
  'POST       /api/v1/socket/publish/event': { controller: 'SocketController', action: 'publishEvent' },


};
