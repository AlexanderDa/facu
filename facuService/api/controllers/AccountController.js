/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

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

    logout: async function (req, res) {
        delete req.session.userId;
        res.send('OK')
    },

    me: async function (req, res) {
        if (req.me)
            res.send({ isLogged: true, me: User.format(req.me) })
        res.send({ isLogged: false })
    }
};

