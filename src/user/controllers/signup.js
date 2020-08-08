nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = async (req, res) => {
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        })
    )

    try {
        let nodemailerRespone = await transporter.sendMail({
            from: 'javidev.8@gmail.com',
            to: req.fields.email,
            subject: 'test', 
            text: 'testing nodemailer', 
        })

	console.log( 'nodemailerRespone: ', nodemailerRespone )
	res.status(200).send()
    } catch (err) {
	console.log( 'nodemailer catched error: ', err )
	res.status(err.responseCode || 500).send()
    }
}
