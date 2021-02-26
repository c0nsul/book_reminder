//jwt
const jwt = require('jsonwebtoken')
//config configuration
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] //bearer token

        if (!token){
            return res.status(401).json({message: 'No token authenticated!'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //save decoded token to req
        req.user = decoded
        //app continue working
        next()
    } catch (e) {
        res.status(401).json({message: 'Authentication is failure'})
    }
}