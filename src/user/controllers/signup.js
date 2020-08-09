nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))

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

        console.log('nodemailerRespone: ', nodemailerRespone)

        if (await User.findOne({ email: req.fields.email }).select('email'))
            res.status(409).send(
                `el email ${req.fields.email} ya está registrado`
            )
	else {
	    const user = await new User({
		email: req.fields.email
	    })
	    user.save()
	    res.status(201).send('usuario registrado')
	}

        res.status(200).send()
    } catch (err) {
        console.log('nodemailer catched error: ', err)
        res.status(err.responseCode || 500).send()
    }
}
