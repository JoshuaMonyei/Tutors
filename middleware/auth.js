// check tosee if there's a token and header
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {SECRET} =  process.env;

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");

    // check if token exists
    if(!token)
        return res.status(401).json({ statusCode: 401, message: "Invalid Token, Authorization denied!"});
    try {
        const decoded = jwt.verify(token, SECRET)
        
        // Assign user to request object
        req.use = decoded.user
        next();
    } catch (error) {
        res.status(400).json({statusCode: 400, message: "Token is not valid"});
    }
}