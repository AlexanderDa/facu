/**
 * PropessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    download: async function (req, res) {
        var Path = require('path');
        var fs = require('fs');
        var image = await Image.findOne(req.param('id'));
        if (!image) { throw 'notFound'; }

        // If a relative path was provided, resolve it relative
        // to the cwd (which is the top-level path of this sails app)
        fs.createReadStream(Path.resolve(image.fd))
            .on('error', function (err) {
                return res.serverError(err);
            })
            .pipe(res);
    },

    userAvatar: async function (req, res) {
        req.file('image').upload(
            { maxBytes: sails.config.custom.maxImageSize },
            async function whenDone(err, uploadedFiles) {
                if (err) {
                    res.serverError({ err })
                }
                if (uploadedFiles.length === 0) {
                    res.status = 400;
                    res.send({ saved: false, msg: 'Image not attached' })
                }
                else {
                    let file = uploadedFiles[0]
                    let newImage = await Image.create({
                        fd: file.fd,
                        type: file.type,
                        field: file.field
                    }).fetch();

                    // delete old image
                    if (req.me.image) {
                        let deletedImage = await Image.destroyOne(req.me.image.split("/")[5]);
                        const fs = require('fs');
                        fs.unlink(deletedImage.fd, () => {
                            sails.log('Image deleted from server')
                        });
                    }


                    let updatedUser = await User.updateOne(req.me.id, {
                        image: `${sails.config.custom.baseUrl}/file/image/${newImage.id}`
                    });
                    if (!updatedUser) {
                        res.status = 500;
                        res.send({ updated: false })
                    } else {
                        res.send({
                            url: updatedUser.image
                        });
                    }

                }

            });
    }
};

