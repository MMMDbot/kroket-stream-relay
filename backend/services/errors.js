/**
 * Error generator to use throughout the application.
 *
 */
function generateError(err) {
    const res = {
        message: 'Server Error',
        code: err,
    }
    return res
}

module.exports = { generateError }
