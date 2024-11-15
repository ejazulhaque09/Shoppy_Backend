const jwt = require('jsonwebtoken')
// middleware for authentication
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({
            success: false,
            msg: "No token Provided"
        })
    }
    try{    
        const decoded = jwt.verify(token, process.env.secret);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        res.status(401).json({
            success: false,
            msg: "Invalid token"
        })
    }
}