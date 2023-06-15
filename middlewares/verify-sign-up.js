const User = require('../models/user-model');

const checkDuplicateEmail = async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });
    console.log(user);
        if(user) {
            res.status(400).send({message: 'Failed! Email already in use!'});
            return;
        }

        next();
    
};

module.exports = { checkDuplicateEmail };