const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const verifyToken = (req, res, next) => {
    try {
        console.log('in verify token.');
        let token = req.headers.authorization;  
        console.log(req.headers);
        console.log(token,' tikt111:::');
        token = token.replace('Bearer ', '');
        console.log(token,' tiktoken2222:::');

        if(!token) {
            return res.status(403).send({message: 'No token provided!'});
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).send({message: 'Unauthorized!'});
            }
            req.userId = decoded.id;
            next();
        }); 
    } catch (error) {
        console.error('error in verify: ', error);
    }
    
};

const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId);
 
        if(user.role === 'admin') {
            next();
            return;
        }
        res.json({ message: "Require Admin Role!" });
        return;
  
    
};

module.exports = { verifyToken, isAdmin };