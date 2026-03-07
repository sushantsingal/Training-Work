const mongoose = require('mongoose');
const { College } = require('../model');

const getEntities = async (searchParams) => {

    try {
        let filters = {...searchParams};
        delete filters.skip;
        delete filters.limit;

        const {skip, limit} = searchParams;
        const entities = await College.find(filters).lean();

        return entities;
    } catch (error) {
        throw error;
    }
}

const getEntityById = async (id) => {
    try{
        const entity = await College.findById(id).lean();
        return entity;
    } catch (error) {
        throw error;
    }
}

const createEntity = async (data) => {

    try {
        const entity = await College(data);
        await entity.save();
        return entity.toObject();
    } catch (error) {
        throw error;
    }
}

const patchEntity = async (filters, data) => {
    try {
        const entity = await College.findOneAndUpdate(filters, data, {new: true});
        return entity.toObject();
    } catch (error) {
        throw error;
    }
}

const deleteEntity = async (id) => {

    try {
        const entity = await College.findByIdAndDelete(id);
        return entity;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getEntities,
    getEntityById,
    patchEntity,
    deleteEntity,
    createEntity
};