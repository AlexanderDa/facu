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
        res.ok()
    },

    me: async function (req, res) {
        if (req.me)
            res.send({ isLogged: true, me: User.format(req.me) })
        else
            res.send({ isLogged: false })
    },

    updateProfile: async function (req, res) {
        if (req.me) {
            let updatedUser = await User.updateOne(req.me.id, req.allParams());
            if (!updatedUser) {
                res.serverError({ updated: false })
            } else {
                res.send(User.format(updatedUser));
            }
        } else {
            res.forbidden()
        }
    },

    updatePassword: async function (req, res) {
        if (req.me) {
            let updatedUser = await User.updateOne(req.me.id, {
                password: await Crypto.encrypt(req.param('password'))
            });
            if (!updatedUser) {
                res.serverError({ updated: false })
            } else {
                res.send(User.format(updatedUser));
            }
        } else {
            res.forbidden()
        }
    },

    resetPassToken: async function (req, res) {
        const { emailAddress } = req.allParams()
        const foundUser = await User
            .findOne({ emailAddress: emailAddress.toLowerCase() })
            .catch(err => res.serverError({ err }))

        if (!foundUser) return res.forbidden()
        else {
            const updatedUser = await User.updateOne(foundUser.id, {
                passwordResetToken: getToken(foundUser.id),
                passwordResetTokenDate: new Date()
            });
            await Mailer.sendMail('passToken', updatedUser);
            res.ok()
        }

    },

    resetPass: async function (req, res) {
        const { token, password } = req.allParams()
        const foundUser = await User
            .findOne({ passwordResetToken: token })
            .catch(err => res.serverError({ err }))

        if (!foundUser) return res.forbidden()



        if (new Date().toDateString() === new Date(foundUser.passwordResetTokenDate).toDateString()) {
            const updatedUser = await User.updateOne(foundUser.id, {
                passwordResetToken: null,
                password: await Crypto.encrypt(password)
            });
            if (updatedUser) {
                req.session.userId = updatedUser.id;
                res.send({ logged: true, user: User.format(updatedUser) })
            }
        } else {
            res.status(401)
            res.send({ err: 'Invalid Token' })
        }

    },
};



function getToken(userId) {
    let result = `${userId}`;
    const date = new Date()
    const characters = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
        + `${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result
}