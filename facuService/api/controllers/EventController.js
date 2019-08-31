/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    getAll: async function (req, res) {
        let list = await Event.find();
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            res.send(list);
        }
    },


    getByHistory: async (req, res) => {
        let limit = (req.param('limit')) ? req.param('limit') : 5
        const query = `SELECT
    id,
    name,
    description,
    publish_date as "publishDate",
    event_date as "eventDate",
    qr_code as "qrCode",
    image
    FROM event WHERE event_date < $1 limit $2`
        await Event.getDatastore().sendNativeQuery(
            query,
            [req.param('lastDate'), limit],
            (err, result) => {
                if (err) {
                    return 'notFound'
                }
                let events = []
                for (let event of result.rows) {
                    events.push(event);
                }
                res.send(events);
            });
    },

    getById: async function (req, res) {
        let element = await Event.findOne(req.param('id')).populate('activities');
        if (!element) {
            res.serverError({ fetched: false })
        } else {
            res.send(element);
        }
    },


    createNewEvent: async function (req, res) {
        res.setTimeout(sails.config.custom.timeout);
        req.file('image').upload(
            { maxBytes: sails.config.custom.maxImageSize },
            async function whenDone(err, uploadedFiles) {
                if (err) {
                    res.serverError({ err })
                }
                if (uploadedFiles.length === 0) {
                    res.serverError({ saved: false, msg: 'Image not attached' })
                }
                else {
                    let file = uploadedFiles[0]
                    let newImage = await Image.create({
                        fd: file.fd,
                        type: file.type,
                        field: file.field
                    }).fetch();

                    let newEvent = await Event.create({
                        name: req.param('name'),
                        description: req.param('description'),
                        publishDate: new Date(),
                        eventDate: req.param('eventDate'),
                        image: `${sails.config.custom.baseUrl}/file/image/${newImage.id}`
                    }
                    ).fetch();

                    return res.send(newEvent);
                }

            });

    },


    updateOneEvent: async function (req, res) {
        res.setTimeout(sails.config.custom.timeout);

        req.file('image').upload(
            { maxBytes: sails.config.custom.maxImageSize },
            async function whenDone(err, uploadedFiles) {
                if (err) {
                    res.serverError({ saved: false })
                }
                if (uploadedFiles.length === 0) {
                    let updateEvent = await Event.updateOne(req.param('id'), {
                        name: req.param('name'),
                        description: req.param('description'),
                        eventDate: req.param('eventDate'),
                    });
                    res.send(updateEvent)
                }
                else {
                    let file = uploadedFiles[0]
                    let newImage = await Image.create({
                        fd: file.fd,
                        type: file.type,
                        field: file.field
                    }).fetch();



                    // delete old image
                    let eventFound = await Event.findOne(req.param('id'));
                    let deletedImage = await Image.destroyOne(eventFound.image.split("/")[5]);
                    const fs = require('fs');
                    fs.unlink(deletedImage.fd, () => {
                        sails.log('Image deleted from server')
                    });



                    //uptdate event
                    let updateEvent = await Event.updateOne(req.param('id'), {
                        name: req.param('name'),
                        description: req.param('description'),
                        eventDate: req.param('eventDate'),
                        image: `${sails.config.custom.baseUrl}/file/image/${newImage.id}`
                    });
                    res.send(updateEvent)
                }

            });

    },


    deleteOneEvent: async function (req, res) {
        let deletedEvent = await Event.destroyOne(req.param('id'));
        if (!deletedEvent) {
            res.serverError({ deleted: false })
        } else {
            let deletedImage = await Image.destroyOne(deletedEvent.image.split("/")[5]);
            const fs = require('fs');
            fs.unlink(deletedImage.fd, () => {
                sails.log('Image deleted from server')
            });


            res.send(deletedEvent);
        }
    }
};

