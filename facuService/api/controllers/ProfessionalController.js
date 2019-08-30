/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    getAll: async function (req, res) {
        let list = await Professional.find();
        if (!list) {
            res.serverError({ fetched: false })
        } else {
            res.send(Professional.format(list));
        }
    },

    getById: async function (req, res) {
        let professional = await Professional.findOne(req.param('id')).populate('works');
        if (!professional) {
            res.serverError({ fetched: false })
        } else {
            res.send(Professional.format(professional));
        }
    },


    createNewProfessional: async function (req, res) {
        res.setTimeout(sails.config.custom.timeout);
        req.file('image').upload(
            { maxBytes: sails.config.custom.maxImageSize },
            async function whenDone(err, uploadedFiles) {
                if (err) {
                    res.serverError({ err })
                }

                if (uploadedFiles.length !== 0) {
                    let file = uploadedFiles[0]
                    const newImage = await Image.create({
                        fd: file.fd,
                        type: file.type,
                        field: file.field
                    }).fetch();

                    const newProfessional = await Professional.create({
                        lastName: req.param('lastName'),
                        firstName: req.param('firstName'),
                        education: req.param('education'),
                        collegeDegree: req.param('collegeDegree'),
                        specialization: req.param('specialization'),
                        experience: req.param('experience'),
                        image: (newImage) ? `${sails.config.custom.baseUrl}/file/image/${newImage.id}` : ''
                    }).fetch();
                    if (!newProfessional) {
                        res.serverError({ saved: false })
                    } else {
                        res.send(Professional.format(newProfessional));

                    }

                }


                else {
                    const newProfessional = await Professional.create(req.allParams()).fetch();
                    if (!newProfessional) {
                        res.serverError({ saved: false })
                    } else {
                        res.send(Professional.format(newProfessional));

                    }
                }
            });
    },


    updateOneProfessional: async function (req, res) {
        /*let updatedProfessional = await Professional.updateOne(req.param('id'), req.allParams());
        if (!updatedProfessional) {
            res.serverError({ updated: false })
        } else {
            res.send(Professional.format(updatedProfessional));
        }*/
        res.setTimeout(sails.config.custom.timeout);
        req.file('image').upload(
            { maxBytes: sails.config.custom.maxImageSize },
            async function whenDone(err, uploadedFiles) {
                if (err) {
                    res.serverError({ err })
                }

                if (uploadedFiles.length !== 0) {



                    let file = uploadedFiles[0]
                    const newImage = await Image.create({
                        fd: file.fd,
                        type: file.type,
                        field: file.field
                    }).fetch();

                    // delete old image
                    const professionalFound = await Professional.findOne(req.param('id'));
                    if (professionalFound)
                        if (professionalFound.image !== '') {
                            let deletedImage = await Image.destroyOne(professionalFound.image.split("/")[5]);
                            const fs = require('fs');
                            fs.unlink(deletedImage.fd, () => {
                                sails.log('Image deleted from server')
                            });
                        }

                    const updatedProfessional = await Professional.updateOne(req.param('id'), {
                        lastName: req.param('lastName'),
                        firstName: req.param('firstName'),
                        education: req.param('education'),
                        collegeDegree: req.param('collegeDegree'),
                        specialization: req.param('specialization'),
                        experience: req.param('experience'),
                        image: (newImage) ? `${sails.config.custom.baseUrl}/file/image/${newImage.id}` : ''
                    });

                    if (!updatedProfessional) {
                        res.serverError({ saved: false })
                    } else {
                        res.send(Professional.format(updatedProfessional));

                    }

                }


                else {
                    const updatedProfessional = await Professional.updateOne(req.param('id'), req.allParams());
                    if (!updatedProfessional) {
                        res.serverError({ updated: false })
                    } else {
                        res.send(Professional.format(updatedProfessional));
                    }
                }
            });
    },



    deleteOneProfessional: async function (req, res) {
        let deletedProfessional = await Professional.destroyOne(req.param('id'));
        if (!deletedProfessional) {
            res.serverError({ deleted: false })
        } else {
            if (deletedProfessional.image) {
                let deletedImage = await Image.destroyOne(deletedProfessional.image.split("/")[5]);
                const fs = require('fs');
                fs.unlink(deletedImage.fd, () => {
                    sails.log('Image deleted from server')
                });
            }

            res.send(Professional.format(deletedProfessional));
        }
    }
};

