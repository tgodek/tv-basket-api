const User = require('../models/User');

module.exports.all_users_get = async (req,res) => {
    const users = await User.find();
    res.json(users);
}