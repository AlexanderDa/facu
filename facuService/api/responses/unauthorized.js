module.exports = function unauthorized() {

    var req = this.req;
    var res = this.res;

    sails.log.verbose('Ran custom response: res.unauthorized()');

    return res.sendStatus(401);
    
};