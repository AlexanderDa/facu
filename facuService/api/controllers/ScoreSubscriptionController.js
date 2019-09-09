/**
 * ScoreSubscriptionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getScoreFromAtivity: async function (req, res) {
        res.send({ functionName: 'getScoreFromAtivity', me: req.me })
    },

    postScoreToAtivity: async function (req, res) {
        let hasSubscription = await ScoreSubscription.findOne({
            activity: req.param('activityId'),
            user: req.me.id,
        });

        if (hasSubscription !== undefined) {
            console.log('suscrito')
            let scoreSubscription = await ScoreSubscription.update(
                {
                    activity: req.param('activityId'),
                    user: req.me.id
                },
                {
                    scoreDate: new Date(),
                    note: req.param('note')
                }
            ).fetch();
            if (scoreSubscription) {
                res.send({ scoreSubscription });
            }
        } else {


            let scoreSubscription = await ScoreSubscription.create(
                {
                    activity: req.param('activityId'),
                    user: req.me.id,
                    hasSubscription: false,
                    note: req.param('note')
                }
            ).fetch()

            if (scoreSubscription) {
                res.send({ scoreSubscription });
            }
        }
    },




    getSubscribersFromAtivity: async function (req, res) {
        res.send({ functionName: 'getSubscribersFromAtivity' })
    },


    getSubscribedActivities: async function (req, res) {
        let subscribed = await ScoreSubscription.find({
            user: 1
        }).populate('activity');
        for (i = 0; i < subscribed.length; i++) {
            subscribed[i].activity.event = await Event.findOne(subscribed[i].activity.event)
        }
        res.send({ subscribed })
    },



    postSubscriberToAtivity: async function (req, res) {
        let subscribed = await ScoreSubscription.findOne({
            activity: req.param('activityId'),
            user: req.me.id
        });
        if (!subscribed) {
            let newSubscribed = await ScoreSubscription.create({
                activity: req.param('activityId'),
                user: req.me.id,
                subscriptionDate: new Date(),
                hasSubscription: true
            }).fetch();
            if (!newSubscribed) {
                res.send({ subscribed: false });
            } else {
                res.send({ subscribed: true });
            }
        }
        else {
            let updatedSubscribed = await ScoreSubscription.updateOne(subscribed.id, {
                hasSubscription: !subscribed.hasSubscription
            });
            if (updatedSubscribed) {
                res.send({ subscribed: updatedSubscribed.hasSubscription });
            } else {
                res.send({ subscribed: subscribed.hasSubscription });
            }
        }

    },

    getHasSubscription: async (req, res) => {

        let subscribed = await ScoreSubscription.findOne({
            activity: req.param('activityId'),
            user: req.me.id
        });
        res.send({ subscribed: subscribed.hasSubscription })

    },

};

