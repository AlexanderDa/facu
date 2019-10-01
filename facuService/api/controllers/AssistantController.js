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
            event.eventDate = DateParse.format(event.eventDate)
            event.publishDate = DateParse.format(event.publishDate)
            assistants.forEach(item => {
                item.user = User.format(item.user)
            });
            res.send({
                event,
                assistants
            });
        }

    },
    getByUserLogged: async (req, res) => {
        const assisted = await Assistant.find({ user: req.me.id })
            .populate('event')
            .sort('id DESC');
        if (!assisted) {
            res.serverError({ fetched: false })
        } else {
            assisted.forEach(element => {
                element.event.eventDate = DateParse.format(element.event.eventDate)
                element.event.publishDate = DateParse.format(element.event.publishDate)
            });
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
            res.serverError({ saved: false, error: 'E_UNIQUE' })
        } else {
            res.send({
                saved: true,
                newAssistant
            });
        }
    }
};

