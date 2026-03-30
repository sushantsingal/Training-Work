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

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const studentAuthMiddleware = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        if (user.role !== 'STUDENT') {
            return res.status(403).json({ message: 'Forbidden: Student access required' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const teacherAuthMiddleware = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        if (user.role !== 'TEACHER') {
            return res.status(403).json({ message: 'Forbidden: Teacher access required' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    authenticate,
    adminAuthMiddleware,
    studentAuthMiddleware,
    teacherAuthMiddleware
}