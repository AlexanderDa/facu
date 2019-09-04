/**
 * Mailer
 * 
 * @help        :: help https://html-online.com/editor/
 * @help        :: Configure Gmail https://myaccount.google.com/lesssecureapps
 */

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'facuevent@gmail.com',
        pass: 'facuP4$$'
    }
});


module.exports.sendMail = async function (template, user) {
    let mailconfig = {
        html: '',
        subject: ''
    }
    var html = ''
    switch (template) {
        case 'welcome':
            mailconfig.subject = 'Bienvenido a FacuEvent'
            mailconfig.html = renderTemplate(user.firstName, `
                <tr>
                    <td style="color: #757575; font-family: 'Roboto',OpenSans,'Open Sans',Arial,sans-serif; font-size: 17px; font-weight: normal; line-height: 24px; margin: 0; padding: 0 25px 0 25px; text-align: center;"
                        align="center">Gracias por crear una cuenta de FacuEvent. A partir de ahora puedes ver los eventos y
                        talleres que ofrecer&aacute; la carrera.</td>
                </tr>
            `)
            break;
        case 'passToken':
            mailconfig.subject = 'Restaura tu contraseña'
            mailconfig.html = renderTemplate(user.firstName, `
                <tr>
                    <td style="color: #757575; font-family: 'Roboto',OpenSans,'Open Sans',Arial,sans-serif; font-size: 17px; font-weight: normal; line-height: 24px; margin: 0; padding: 0 25px 0 25px; text-align: center;"
                        align="center">Para restablecer su contraseña, use el token <span style="color: #4285f4;">${user.passwordResetToken}</span>.
                        <br><br>
                        Recuerde que este token es v&aacute;lido solo por hoy. </td>
                </tr>
                `)
            break;
    }

    var mailOptions = {
        from: 'facuevent@gmail.com',
        to: user.emailAddress,
        subject: mailconfig.subject,
        html: mailconfig.html
    };

    await transporter.sendMail(mailOptions)
        .then(() => {
            sails.log.info(`Email sent to: \x1b[36m${user.emailAddress}\x1b[0m`)
        })
        .catch(() => {
            sails.log.debug(`Error sending email to: \x1b[36m${user.emailAddress}\x1b[0m`)
        })
}






function renderTemplate(user, template) {
    let templateToRender = `
    <div style="border: 10px solid #eeeeee; width: 500px;margin:auto">
        <table border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
            <tbody>
                <tr>
                    <td height="49">
                        <p>&nbsp;<img style="display: block; margin-left: auto; margin-right: auto;"
                                src="https://lh3.googleusercontent.com/a-/AAuE7mAkPdodfde003tYptle8uViWMr32K1FA2VG_lWa=s96-cc"
                                alt="Logo" width="96" height="96" /></p>
                    </td>
                </tr>
                <tr>
                    <td style="color: #4285f4; font-family: 'Roboto',OpenSans,'Open Sans',Arial,sans-serif; font-size: 32px; font-weight: normal; line-height: 46px; margin: 0; padding: 0 25px 0 25px; text-align: center;"
                        align="center">Hola ${user}:</td>
                </tr>
                <tr>
                    <td height="20">&nbsp;&nbsp;</td>
                </tr>
                ${template}
            </tbody>
        </table>
    </div>
    `
    return templateToRender
}