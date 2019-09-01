/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    getAll: async function (req, res) {
        let list = await User.find();
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            res.send(User.format(list));
        }
    },

    getById: async function (req, res) {
        let user = await User.findOne(req.param('id'));
        if (!user) {
            res.serverError({ fetched: false })
        } else {
            res.send(User.format(user));
        }
    },


    createNewUser: async function (req, res) {
        let newUser = await User.create({
            emailAddress: req.param('emailAddress'),
            password: req.param('password'),
            lastName: req.param('lastName'),
            firstName: req.param('firstName'),
        }).fetch();
        if (!newUser) {
            res.serverError({ saved: false })
        } else {
            await Mailer.sendMail('welcome', newUser);
            res.send(User.format(newUser));
        }
    },


    updateOneUser: async function (req, res) {
        let updatedUser = await User.updateOne(req.param('id'), req.allParams());
        if (!updatedUser) {
            res.serverError({ updated: false })
        } else {
            res.send(User.format(updatedUser));
        }
    },


    deleteOneUser: async function (req, res) {
        let deletedUser = await User.destroyOne(req.param('id'));
        if (!deletedUser) {
            res.serverError({ deleted: false })
        } else {
            res.send(User.format(deletedUser));
        }
    }
};

