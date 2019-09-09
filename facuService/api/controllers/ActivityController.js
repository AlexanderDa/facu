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
            res.send(list);
        }
    },

    getByEvent: async (req, res) => {

        let list = await Activity.find({ event: req.param('eventId') });
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            res.send(list);
        }
    },

    getById: async function (req, res) {
        let activity = await Activity.findOne(req.param('id'));
        if (!activity) {
            res.serverError({ fetched: false })
        } else {
            res.send(activity);
        }
    },


    createNewActivity: async function (req, res) {
        let newActivity = await Activity.create(req.allParams()).fetch();
        if (!newActivity) {
            res.serverError({ saved: false })
        } else {
            res.send(newActivity);

        }
    },
    updateOneActivity: async function (req, res) {
        let updatedActivity = await Activity.updateOne(req.param('id'), req.allParams());
        if (!updatedActivity) {
            res.serverError({ updated: false })
        } else {
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

