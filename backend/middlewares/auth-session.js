// Add middleware for routes that require authentication via session + cookies
module.exports = function (req, res, next) {
    const userid = req.session.userid
    if (!userid) {
        res.json({ message: 'Not logged in' })
    } else {
        next()
    }
}
