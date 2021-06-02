const User = require('../models/userModel');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const  bcrypt = require('bcrypt');
const {SECRET} = process.env;
const expiry = 86400;


// @route   GET api/auth/login
// @desc    Auth user(student, tutor, admin) and get token
// @access  public route
exports.getLoggedInUser = async (req, res) => {
    //GET user from db
    try {
        const user = await User.findById(req.user.id).select("-password");
        // return user 
        res.json({
            statusCode: 200,
            message: 'User gotten successfully',
            user: user
        })
    } catch (err) {
        console.err(err.message);
        res.status(500).send("Server Error");
    }
    
}

// @route   POST api/auth/login
// @desc    Auth user(student, tutor, admin) and get token
// @access  public route
exports.loginUser = async (req, res) => {
    // check for errors in email input
    const errors = validationResult(req);
    if(!errors.isEmpty()) 
        return res.status(400).json({errors: errors.array()});
    
    // else
    // destructure req body
    const {email, password} = req.body;
    try {
        //Initialize new user
        let user = await User.findOne({email: email});

        if (!user) return res.status(400).json({ statusCode: 400, message: "You're yet to be registered "});

        // else,check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) 
            return res.status(400).json({ statusCode: 400, message: 'Email and password do not match' });
            
        // else, there's a match, send token, payload and signed token
        const payload = {
            user: {
                id: user.id,
            }
        };
        jwt.sign(
            payload,
            SECRET,
            {
                expiresIn: 86400,
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    statusCode: 200,
                    message:'Logged in successfully.',
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin,
                    },
                    token
                })
            })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

}

exports.registerNewUser = (req, res) => {
    // fetch user details from req.body
    const {firstName, lastName, email, password, role, isAdmin, isTutor} = req.body;
    // check if the email already exists
    User.findOne({ email: email}, (err, existingUser) => {
        if (err) {
            return res.status(500).json({message: "something is wrong", err})
        } 
        if (existingUser) {
            return res.status(400).json({message: "Email already in use"})
        }
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role,
            isAdmin,
            isTutor
        })
        
        // hash users password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({err})
            }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return res.status(500).json({message: "check hash", err})
                }
                user.password = hash
                user.save(err, savedUser => {
                    if (err) {
                        return res.status(500).json({message: "check save", err})
                    } 
                })

                // create jwt for user
                jwt.sign({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    isTutor: user.isTutor,
                    isAdmin: user.isAdmin,
                    }, SECRET, {expiresIn: expiry}, (err, token) => {
                        if (err) {
                            return res.status(500).json({message: "check secret", err})
                        }
                    
                        res.json({statusCode: 200,
                            message:'User created successfully.',
                            user: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                role: user.role,
                                isTutor: user.isTutor,
                                isAdmin: user.isAdmin,
                            },
                            token
                        
                    })
                })

            })
        })
    })
}

exports.fetchTutors = async (req, res) => {
    try {
        let tutors = await User.find({ role: { $eq: "tutor" } })
        if (!tutors) {
            return res.status(404).json({message: 'No tutor has been registered'})
        }

        return res.status(200).json({tutors})
        
    
    } catch (error) {
        return res.status(500).json({message: "Server Error", error})
    }
    
}

exports.fetchSingleTutor = async (req, res) => {
    const tutorId = req.params.userId
    try {
        const tutorSearch = await User.find({ role: { $eq: "tutor" } }, 'firstName lastName role email id')
        if (!tutorSearch) {
            return res.status(404).json({message: 'No tutor has been registered'})
        }
        const search = tutorSearch.find(({_id}) => _id == tutorId)
        if (!search) {
            return res.status(404).json({message: 'Tutor with the Id does not exist'})
        }
        res.json({
            statusCode: 200,
            message: 'Tutor gotten successfully',
            search
        })
    } catch (err) {
        return res.status(500).json({message: "Server error", err})
    }
}