const jwt = require('jsonwebtoken');
const {getEntityById} = require('../DAO/user.dao');
const { getPublicKey } = require('../core/utils');

const publicKey = getPublicKey();

const authenticate = async (req, res, next) => {
    try{
        const token = req.headers('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Access Denied. No token provided' });
        }

        const decode = jwt.verify(token, publicKey);
        const user = await getEntityById(decode._id);

        if(!user) {
            return res.status(401).json({ error: 'Access Denied. User not found' });
        }

        switch(user.role) {
            case 'ADMIN':
                req.admin = user;
                break;
            case 'TEACHER':
                req.teacher = user;
                break;
            case 'STUDENT':
                req.student = user;
                break;
            default:
                return res.status(401).json({ error: 'Invalid access' });
        }

        next();
        // if(user.role === 'ADMIN') {
        //     req.admin = user;
        //     next();
        // }
        
        // if(user.role === 'TEACHER') {
        //     req.teacher = user;
        //     next();
        // }
        
        // if(user.role === 'STUDENT') {
        //     req.student = user;
        //     next();
        // }

        
    } catch(err) {
        console.error('Authentication error:', err);
        return res.status(401).json({ error: 'Not a valid user' });
    }
};

module.exports = authenticate;