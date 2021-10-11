module.exports = function (req, res, next) {
    const { username, password, email, full_name, organization_id } = req.body

    function validEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    if (req.path === '/register') {
        if (![email, username, password].every(Boolean)) {
            return res.json('Missing Credentials')
        } else if (!validEmail(email)) {
            return res.json('Invalid Email')
        }
    } else if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.json('Missing Credentials')
        } else if (!validEmail(email)) {
            return res.json('Invalid Email')
        }
    }

    next()
}
