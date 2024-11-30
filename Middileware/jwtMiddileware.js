const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("inside  jwtMiddleware");
    try {
        const token = req.headers["authorization"].split(" ")[1]
        if (token) {
            const jwtResponse = jwt.verify(token, process.env.jwt_sercet)
            req.payload = jwtResponse.userId
            next()
        } else {
            res.status(401).json("please provide token")
        }
    } catch(err) {
        res.status(403).json("please login",err.message)
    }
}

module.exports = jwtMiddleware