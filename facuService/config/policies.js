/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'logged',
  //Only for superAdmin

  ProfessionalController: {
    createNewProfessional: 'superadmin',
    updateOneProfessional: 'superadmin',
    deleteOneProfessional: 'superadmin'
  },

  WorkController: {
    createNewWork: 'superadmin',
    updateOneWork: 'superadmin',
    deleteOneWork: 'superadmin'
  },

  EventController: {
    createNewEvent: 'superadmin',
    updateOneEvent: 'superadmin',
    deleteOneEvent: 'superadmin'
  },

  ActivityController: {
    createNewActivity: 'superadmin',
    updateOneActivity: 'superadmin',
    deleteOneActivity: 'superadmin'
  },


  // Public paths
  ImageController: {
    download: true
  },

  UserController: {
    createNewUser: true
  },

  AccountController: {
    login: true,
    resetPass: true,
    resetPassToken: true,
  }

};
