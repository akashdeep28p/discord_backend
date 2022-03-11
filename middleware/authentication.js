const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

const verifyToken = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers['authorization']

        if (!token) return res.status(StatusCodes.FORBIDDEN).send('Token is required to access this route')

        token = token.replace(/^Bearer\s+/, '')
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.payload = decoded

        next()
    }
    catch (err){
        res.status(StatusCodes.UNAUTHORIZED).send('Invalid Token')
    }
}

module.exports = {
    verifyToken
}