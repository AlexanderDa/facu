/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

    getAll: async function (req, res) {
        let list = await Work.find();
        if (!list) {
            res.status = 500;
            res.send({ fetched: false })
        } else {
            res.send(list);
        }
    },

    getById: async function (req, res) {
        let list = await Work.findOne(req.param('id'));
        if (!list) {
            res.status = 500;
            res.send({ fetched: false })
        } else {
            res.send(list);
        }
    },


    createNewWork: async function (req, res) {
        let newWork = await Work.create(req.allParams()).fetch();
        if (!newWork) {
            res.status = 500;
            res.send({ saved: false })
        } else {
            res.send({ saved: true, newWork });

        }
    },
    updateOneWork: async function (req, res) {
        let updatedWork = await Work.updateOne(req.param('id'), req.allParams());
        if (!updatedWork) {
            res.status = 500;
            res.send({ updated: false })
        } else {
            res.send({
                updated: true,
                updatedWork
            });
        }
    },
    deleteOneWork: async function (req, res) {
        let deletedWork = await Work.destroyOne(req.param('id'));
        if (!deletedWork) {
            res.status = 500;
            res.send({ deleted: false })
        } else {
            res.send({
                deleted: true,
                deletedWork
            });
        }
    }
};

