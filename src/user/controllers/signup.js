nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    // already registered email?
    if (await User.findOne({ email: req.fields.email }).select('email'))
        res.status(409).send(`el email ${req.fields.email} ya está registrado`)
    else {
        const user = await new User({
            name: req.fields.name,
            email: req.fields.email,
            hashedPass: await bcrypt.hashSync(req.fields.pass, 5),
        })

        try {
            // set email transporter
            const transporter = nodemailer.createTransport(
                smtpTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS,
                    },
                })
            )
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: req.fields.email,
                subject: 'test',
                text: `${
                    process.env.HOST_URL
                }/api/verifiy/?hash=${await jwt.sign(
                    { data: req.fields.email },
                    process.env.VERIF_EMAIL_JWT_KEY,
                    { expiresIn: '1h' }
                )}`,
            })

            user.save()
            res.status(201).send('usuario registrado')
        } catch (err) {
            res.status(err.responseCode || 500).send()
        }
    }

    res.status(200).send()
}
