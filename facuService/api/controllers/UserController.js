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

        let { emailAddress, password, lastName, firstName } = req.allParams()
        emailAddress = emailAddress.toLowerCase();
        const newUser = await User.create({ emailAddress, password, lastName, firstName })
            .intercept('E_UNIQUE', 'emailAlreadyInUse')
            .intercept({ name: 'UsageError' }, 'invalid')
            .fetch();

        await Mailer.sendMail('welcome', newUser)
        req.session.userId = newUser.id;

        res.send({ logged: true, user: User.format(newUser) })
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

