/**
 * User.js
 *
 * A user who can log in to this application.
 */
const bcrypt = require('bcryptjs')
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


    telephone: {
      type: 'string',
      maxLength: 15
    },

    image: {
      type: 'string',
      maxLength: 150,
      columnType: 'character varying(150)',
    },


    passwordResetToken: {
      type: 'string',
      columnName: 'pass_reset_token',
      allowNull: true
    },

    passwordResetTokenDate: {
      type: 'ref',
      columnType: 'date',
      columnName: 'pass_reset_token_date'
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
  },





  beforeCreate: (user, next) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error)

      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error)

        user.password = hash
        next()
      })
    })
  },

  isValidPassword: (password, user, callback) => {
    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) return callback(error)

      if (isMatch) {
        callback(null, true)
      } else callback(new Error('Passwords doesn\'t match'), false)
    })
  },


  format: function (user) {
    var userObject = {}
    if (Array.isArray(user) == true) {
      userObject = []
      user.forEach(element => {
        userObject.push({
          emailAddress: element.emailAddress,
          fullName: `${element.lastName} ${element.firstName}`,
          lastName: element.lastName,
          firstName: element.firstName,
          isSuperAdmin: element.isSuperAdmin,
          telephone: element.telephone,
          image: element.image
        })
      });
    } else {
      userObject = {
        emailAddress: user.emailAddress,
        fullName: `${user.lastName} ${user.firstName}`,
        lastName: user.lastName,
        firstName: user.firstName,
        isSuperAdmin: user.isSuperAdmin,
        telephone: user.telephone,
        image: user.image
      }
    }
    return userObject
  }

};
