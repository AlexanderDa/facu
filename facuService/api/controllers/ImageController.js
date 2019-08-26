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
    }
};

