const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
require('dotenv').config()

module.exports = async ({ userEmail, subject, text }) => {
    // console.log('params in send mail module:', userEmail, subject, text)
    // set email transporter
    const transporter = await nodemailer.createTransport(
        smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        })
    )

    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: userEmail,
            subject,
            text,
        })
    } catch (err) {
	console.log( 'error on sendMail module:', err )
    }
}
