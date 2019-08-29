/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

    getAll: async function (req, res) {
        let list = await Professional.find();
        if (!list) {
            res.status = 500;
            res.send({ fetched: false })
        } else {
            res.send(Professional.format(list));
        }
    },

    getById: async function (req, res) {
        let list = await Professional.findOne(req.param('id')).populate('works');
        if (!list) {
            res.status = 500;
            res.send({ fetched: false })
        } else {
            res.send(list);
        }
    },


    createNewProfessional: async function (req, res) {
        let newProfessional = await Professional.create(req.allParams()).fetch();
        if (!newProfessional) {
            res.status = 500;
            res.send({ saved: false })
        } else {
            res.send({ saved: true, newProfessional });

        }
    },
    updateOneProfessional: async function (req, res) {
        let updatedProfessional = await Professional.updateOne(req.param('id'), req.allParams());
        if (!updatedProfessional) {
            res.status = 500;
            res.send({ updated: false })
        } else {
            res.send({
                updated: true,
                updatedProfessional
            });
        }
    },
    deleteOneProfessional: async function (req, res) {
        let deletedProfessional = await Professional.destroyOne(req.param('id'));
        if (!deletedProfessional) {
            res.status = 500;
            res.send({ deleted: false })
        } else {
            res.send({
                deleted: true,
                deletedProfessional
            });
        }
    }
};

