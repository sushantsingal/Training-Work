const mongoose = require("mongoose");
const {User} = require("../model");

const getEntities = async (searchParams) => {

    try {
        let filters = {...searchParams};
        delete filters.skip;
        delete filters.limit;
    
        const {skip, limit} = searchParams;
        const entities = await User.find(filters).lean();
    
        return entities;

    } catch (err) {
        throw err;
    }
}

const getEntityById = async (id) => {

    try{
        const entity = await User.findById(id).lean();
        return entity;
    } catch (err) {
        throw err;
    }
}

const createEntity = async (data) => {

    try {
        const entity = new User(data);
        await entity.save();
        return entity.toObject();
    } catch(err) {
        throw  err;
    }
}

const patchEntity = async (filters, data) => {

    try {
        const entity = await User.findOneAndUpdate(filters, data, {new: true});
        return entity.toObject();

    } catch (error) {
        throw error;
    }
}

const deleteEntity = async (id) => {

    try {
        const entity = await User.findByIdAndDelete(id);
        return entity;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getEntities,
    getEntityById,
    createEntity,
    patchEntity,
    deleteEntity
}