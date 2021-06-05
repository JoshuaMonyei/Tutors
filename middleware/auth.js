// check tosee if there's a token and header
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {SECRET} =  process.env;

exports.authenticateUser = (req, res, next) => {
    // check if there's an authoriztion header
    if(!req.headers.authorization) {
        return res.status(401).json({message: "Authorization header required"})
    }
    
    let splittedHeaders = req.headers.authorization.split(' ');
    if (splittedHeaders[0] !== "Bearer") {
        return res.status(400).json({message: "Authorization format is Bearer <token>"})        
    }
    let token = splittedHeaders[1]
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) return res.status(401).json({message: "Invalid authorization token. Please login "})
        req.user = decodedToken
    })
    
    return next()
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({message: "Route is restricted to Admin users only"})
    }
    return next()
}

exports.isTutor = (req, res, next) => {
    if (req.user.role !== 'tutor') {
        return res.status(401).json({message: "Route is restricted to Tutors only"})
    }
    return next()
}

exports.isStudent = (req, res, next) => {
    if (req.user.role !== 'student') {
        return res.status(401).json({message: "Route is restricted to Students only"})
    }
    return next()
}

exports.isAdminOrStudent = (req, res, next) => {
    if (req.user.role == "tutor") {
        return res.status(401).json({message: "You're not permitted to use this route "})
    }
    return next()
}

exports.isAdminOrTutor = (req, res, next) => {
    if (req.user.role == "student") {
        return res.status(401).json({message: "You're not permitted to use this route "})
    }
    return next()
}