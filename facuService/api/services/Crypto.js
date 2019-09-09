const bcrypt = require('bcryptjs')

module.exports = {
  encrypt: async (decrypted) => {
    var encrypted = ''
    /* bcrypt.genSalt(10, (error, salt) => {
       if (error) return next(error)
 
       bcrypt.hash(user.password, salt, (error, hash) => {
         if (error) return next(error)
 
         encrypted = hash
         next()
       })
     })*/
    const salt = await bcrypt.genSalt(10)
    encrypted = await bcrypt.hash(decrypted, salt)
    return encrypted
  },

}
