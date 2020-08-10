module.exports = (req, res) => {
    res.clearCookie('token').status(200).send()
}
