/**
 * SocketsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    onConnect: function (req, res) {
        if (req.me !== undefined) {
            sails.log(`User ${req.me.lastName} ${req.me.firstName} connected.`)
            sails.sockets.join(req, 'new-event-channel');
        }
        return res.ok();
    },

    publishEvent: async function (req, res) {
        let event = req.param('event')
        let updatedEvent = await Event.updateOne(event.id, { wasNotificated: true });
        if (updatedEvent) {
            sails.log(`Event published: ${event.name}`)
            sails.sockets.broadcast('new-event-channel', 'new-event', event);
            return res.ok();
        }
    }

};

