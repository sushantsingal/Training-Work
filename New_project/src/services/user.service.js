const {userDao} = require("../DAO");
const {hashPassword, getPrivateKey} = require("../core/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const privateKey = getPrivateKey();

const loginUser = async (payload) => {
    try{
        //1. Validate the payload
        const users = await userDao.getEntities({email: payload.email});
        if (!users || users.length === 0) {
            return{
                error: "User not found",
                status: 404
            }
        }
        const user = users(0);

        const isPasswordValid = await bcrypt.compare(payload.password, user.password);
        if(!isPasswordValid){
            return{
                error: "Invalid password",
                status: 401
            }
        }

        delete user.password;
        console.log(privateKey);

        //3. Generate JWT token
        let tokenData = {...user};
        const token = jwt.sign(tokenData, privateKey, { algorithm: 'R5256', expires: '1h'});

        return{
            token,
            user: tokenData,
        };
        
    } catch(err) {
        throw err;
    }
}

const registerUser = async (data) => {
    const { username, email, password } = data;

    const existingUser = await userDao.findUserByEmail(email);
    if (existingUser) {
        const error = new Error("User already exists");
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userDao.createUser({
        username,
        email,
        password: hashedPassword
    });

    return user;
};

// const getUserList = async (searchParams) => {
//     const data = await userDao.getEntities(searchParams);
//     return data;
// }

const getUserById = async (id) => {
    const data = await userDao.getEntityById(id);
    return data;
}

const createUser = async (data) => {
    try{
        if(data.password) {
            data.password = await hashPassword(data.password);
        }

        const user = await userDao.createEntity(data);
        return {
            user,
            status: 201,
        };
    } catch(err) {
        throw err;
}}

const updateUser = async (filters, data) => {
    try{
        const updateUser = await userDao.patchEntity(filters, data);
        return updateUser;
    } catch(err) {
        throw err;
    }
}

const deleteUser = async (id) => {
    const deleteUser = await userDao.deleteEntity(id);
    return deleteUser;
}

module.exports = {
    loginUser,
    registerUser,
    getUserById,
    createUser, 
    deleteUser,
    updateUser
}