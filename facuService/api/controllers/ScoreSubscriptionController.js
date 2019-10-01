/**
 * ScoreSubscriptionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getScoreFromAtivity: async function (req, res) {
        const activity = await Activity.findOne(req.param('activityId'))
        const list = await ScoreSubscription
            .find({ activity: req.param('activityId') })
            .populate('user')

        if (!activity || !list) {
            res.serverError({ fetched: false })
        } else {
            activity.activityDate = DateParse.format(activity.activityDate)
            list.forEach(element => {
                element.subscriptionDate = DateParse.format(element.subscriptionDate)
                element.user = User.format(element.user)
            });
            res.send({ activity, subscribed: list })
        }
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
                    score: req.param('score')
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
            user: req.me.id
        }).populate('activity');
        for (i = 0; i < subscribed.length; i++) {
            subscribed[i].subscriptionDate = DateParse.format(subscribed[i].subscriptionDate)
            subscribed[i].activity.activityDate = DateParse.format(subscribed[i].activity.activityDate)
            let event = await Event.findOne(subscribed[i].activity.event)
            event.eventDate = DateParse.format(event.eventDate)
            event.publishDate = DateParse.format(event.publishDate)
            subscribed[i].activity.event = event
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

