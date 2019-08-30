/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    getAll: async function (req, res) {
        console.log(req.me)
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
        let newUser = await User.create(req.allParams()).fetch();
        if (!newUser) {
            res.serverError({ saved: false })
        } else {
            res.send(User.format(newUser));

        }
    },


    login: async function (req, res) {
        const { emailAddress, password } = req.allParams()
        const user = await User
            .findOne({ emailAddress: emailAddress.toLowerCase() })
            .catch(err => res.serverError({ err }))

        if (!user) return res.forbidden()


        User.isValidPassword(password, user, (error, isValid) => {
            if (error) return res.forbidden()
            if (!isValid) return res.forbidden()

            sails.log.info(`User \x1b[36m${user.lastName} ${user.firstName}\x1b[0m logged at ${new Date()} `)

            req.session.userId = user.id;

            res.send(User.format(user))
        })


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

