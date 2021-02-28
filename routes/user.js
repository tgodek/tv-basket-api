const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();


router.get('/', (req, res) => {
        res.send('All users');
    }
);

router.post('/register', async (req, res) => {
        try {

            const checkEmail = await User.findOne({ email: req.body.email });
            const checkUsername = await User.findOne({ username: req.body.username });

            if(checkEmail){
                return res.status(400).send("User already exists");
            }
            
            if(checkUsername){
                return res.status(400).send("User already exists");
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                name: req.body.name, 
                surname: req.body.surname, 
                username: req.body.username, 
                email: req.body.email, 
                password: hashPassword
            });
            
            user.save(function(error, result){
                if(error){
                    if(error.errors["name"]){
                        return res.status(400).send(error.errors["name"].message);
                    }
                    if(error.errors["surname"]){
                        return res.status(400).send(error.errors["surname"].message);
                    }
                    if(error.errors["username"]){
                        return res.status(400).send(error.errors["username"].message);
                    }
                    if(error.errors["email"]){
                        return res.status(400).send(error.errors["email"].message);
                    }
                    if(error.errors["password"]){
                        return res.status(400).send(error.errors["password"].message);
                    }
                }
                if(result){
                    return res.status(201).send("Registration Successful");
                }
            });

        } catch (e) {
            res.send(e);
        }
    }
);

router.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({username:req.body.username});

        if(user) {
            res.json(user);
        } else {
            res.send("no matches");
        }
    } catch (e) {
        res.send(e);
    }
}
);

module.exports = router;