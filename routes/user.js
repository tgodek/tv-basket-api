const express = require('express');
const { findById } = require('../models/User');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
        res.send('All users');
    }
);

router.post('/user1', async (req, res) => {
        try {
            const user = new User(
                {
                    name:req.body.name, 
                    surname:req.body.surname, 
                    username:req.body.username, 
                    email:req.body.email, 
                    password:req.body.password
                });
            const newUser = await user.save();

            res.json(newUser);
        } catch (e) {
            res.send(e);
        }
    }
);

router.get('/user1', async (req, res) => {
    try {
        const user = await User.findOne({username:req.query.username});

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