/**
 * AssistantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getByEvent: async (req, res) => {
        const event = await Event.findOne(req.param('eventId'))
        const assistants = await Assistant.find({ event: req.param('eventId') }).populate('user')
        if (!event || !assistants) {
            res.serverError({ fetched: false })
        } else {
            res.send({
                event,
                assistants
            });
        }

    },
    getByUserLogged: async (req, res) => {
        const assisted = await Assistant.find({ user: req.me.id }).populate('event')
        if (!assisted) {
            res.serverError({ fetched: false })
        } else {
            res.send(assisted)
        }
    },

    eventScore: async (req, res) => {
        let score = await Assistant.updateOne(req.param('id'), req.allParams());
        if (score) {
            res.send({
                updated: true,
            });
        } else {
            res.send({
                updated: false
            });
        }
    },

    post: async (req, res) => {
        let newAssistant = await Assistant.create({ user: req.me.id, event: req.param('eventId') }).fetch();
        if (!newAssistant) {
            res.status(400);
            res.send({
                saved: false,
            });
        } else {
            res.send({
                saved: true,
                newAssistant
            });
        }
    }
};

