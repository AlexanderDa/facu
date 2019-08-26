/**
 * ScoreSubscription.js
 *
 * @description :: A model definition represents a database table/collection.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  tableName: 'score_subscription',
  attributes: {

    activity: {
      model: 'activity',
      required: true,
    },

    user: {
      model: 'user',
      columnName:'userid',
      required: true,
    },

    score: {
      type: 'number',
      columnType: 'integer',
    },

    hasSubscription: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'has_subscription',
    },

    subscriptionDate: {
      type: 'ref',
      columnType: 'timestamp',
      columnName: 'subscription_date',
      example: '2019-01-10 10:30',
    },

    scoreDate: {
      type: 'ref',
      columnType: 'timestamp',
      columnName: 'score_date',
      example: '2019-01-10 10:30',
    },

  }
};

