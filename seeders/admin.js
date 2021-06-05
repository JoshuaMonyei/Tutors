const User = require ('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let password = "admin123";


exports.seedAdmin = () => {
    // check if an admin account exists
    User.findOne({role: "admin"}, (err, admin) => {
        if (err) throw err
        if(admin) {
          return;
        }
        // Create Admin account 
        const user = new User({
            firstName: "Node",
            lastName: "Admin",
            email: "node_admin@gmail.com",
            password: password,
            role: "admin",    
        })

        // hash users password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user.save((err, savedUser) => {
                    if (err) throw err;
                    
                })

            })
            
        })  
        
    })
}

