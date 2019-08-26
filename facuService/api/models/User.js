/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {
  tableName: 'dbuser',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com',
      columnName: 'email',
    },

    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'change-requested', 'confirmed'],
      defaultsTo: 'confirmed',
      columnName: 'email_status'
    },

    emailChangeCandidate: {
      type: 'string',
      isEmail: true,
      columnName: 'email_change_candidate'
    },

    password: {
      type: 'string',
      required: true,
      protect: true,
    },

    lastName: {
      type: 'string',
      required: true,
      maxLength: 60,
      columnName: 'last_name'
    },
    firstName: {
      type: 'string',
      required: true,
      maxLength: 60,
      columnName: 'first_name'
    },

    isSuperAdmin: {
      type: 'boolean',
      columnName: 'superadmin'
    },

    passwordResetToken: {
      type: 'string',
      columnName: 'pass_reset_token'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      columnName: 'pass_reset_token_expires'
    },

    emailProofToken: {
      type: 'string',
      columnName: 'email_proof_token'
    },

    emailProofTokenExpiresAt: {
      type: 'number',
      columnName: 'email_proof_token_expires'
    },

    telephone: {
      type: 'string',
      maxLength: 15
    },

    image: {
      type: 'string',
      maxLength: 150,
      columnType: 'character varying(150)',
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  attends: {//asiste
    collection: 'event',
    via: 'attended',//asisten
    through: 'assistant'// asistencia
  },

  qualifies: {
    collection: 'activity',
    via: 'score',
    through: 'qualification'
  }

};
