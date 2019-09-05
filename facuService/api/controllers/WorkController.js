/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    getAll: async function (req, res) {
        let list = await Work.find({ professional: req.param('professionalId') });
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            res.send(list);
        }
    },

    getById: async function (req, res) {
        let list = await Work.findOne(req.param('id'));
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            res.send(list);
        }
    },


    createNewWork: async function (req, res) {
        let newWork = await Work.create(req.allParams()).fetch();
        if (!newWork) {
            ({ saved: false })
        } else {
            res.send(newWork);

        }
    },
    updateOneWork: async function (req, res) {
        let updatedWork = await Work.updateOne(req.param('id'), req.allParams());
        if (!updatedWork) {
            res.serverError({ updated: false })
        } else {
            res.send(updatedWork);
        }
    },
    deleteOneWork: async function (req, res) {
        let deletedWork = await Work.destroyOne(req.param('id'));
        if (!deletedWork) {
            res.serverError({ deleted: false })
        } else {
            res.send(deletedWork);
        }
    }
};

