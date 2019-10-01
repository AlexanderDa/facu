/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    getAll: async function (req, res) {
        let list = await Activity.find();
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            list.forEach(activity => {
                activity.activityDate = DateParse.format(activity.activityDate)
            });
            res.send(list);
        }
    },

    getByEvent: async (req, res) => {

        let list = await Activity.find({ event: req.param('eventId') })
            .populate('event')
            .populate('professional');
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            list.forEach(activity => {
                activity.activityDate = DateParse.format(activity.activityDate)
                activity.event.eventDate = DateParse.format(activity.event.eventDate)
                activity.event.publishDate = DateParse.format(activity.event.publishDate)
            });
            res.send(list);
        }
    },

    getById: async function (req, res) {
        let activity = await Activity.findOne(req.param('id'))
            .populate('event')
            .populate('professional');
        if (!activity) {
            res.serverError({ fetched: false })
        } else {
            activity.activityDate = DateParse.format(activity.activityDate)
            activity.event.eventDate = DateParse.format(activity.event.eventDate)
            activity.event.publishDate = DateParse.format(activity.event.publishDate)

            res.send(activity);
        }
    },


    createNewActivity: async function (req, res) {
        let newActivity = await Activity.create(req.allParams()).fetch();
        if (!newActivity) {
            res.serverError({ saved: false })
        } else {
            newActivity.activityDate = DateParse.format(newActivity.activityDate)
            res.send(newActivity);

        }
    },
    updateOneActivity: async function (req, res) {
        let updatedActivity = await Activity.updateOne(req.param('id'), req.allParams());
        if (!updatedActivity) {
            res.serverError({ updated: false })
        } else {
            updatedActivity.activityDate = DateParse.format(updatedActivity.activityDate)
            res.send(updatedActivity);
        }
    },
    deleteOneActivity: async function (req, res) {
        let deletedActivity = await Activity.destroyOne(req.param('id'));
        if (!deletedActivity) {
            res.serverError({ deleted: false })
        } else {
            res.send(deletedActivity);
        }
    }
};

