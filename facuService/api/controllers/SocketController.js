/**
 * SocketsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    onConnect: function (req, res) {
        if (req.me) {
            sails.sockets.join(req, 'new-event-channel');
            res.ok()
        } else {
            res.unauthorized();
        }
    },

    publishEvent: async function (req, res) {
        let event = req.param('event')
        let updatedEvent = await Event.updateOne(event.id, { wasNotificated: true });
        if (updatedEvent) {
            sails.log(`Event published: ${event.name}`)
            sails.sockets.broadcast('new-event-channel', 'new-event', event);
            res.send({ wasNotificated: updatedEvent.wasNotificated });
        }
    }

};

