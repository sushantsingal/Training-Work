const mongoose = require('mongoose');
const { Department } = require('../model');

const getEntities = async (searchParams) => {

    try {
        let filters = {...searchParams};
        delete filters.skip;
        delete filters.limit;

        const {skip, limit} = searchParams;
        const entities = await Department.find(filters).lean();

        return entities;
    } catch (error) {
        throw error;
    }
}

const getEntityById = async (id) => {
    try{
        const entity = await Department.findById(id).lean();
        return entity;
    } catch (error) {
        throw error;
    }
}

const createEntity = async (data) => {

    try {
        const entity = await Department(data);
        await entity.save();
        return entity.toObject();
    } catch (error) {
        throw error;
    }
}

const patchEntity = async (filters, data) => {
    try {
        const entity = await Department.findOneAndUpdate(filters, data, {new: true});
        return entity.toObject();
    } catch (error) {
        throw error;
    }
}

const deleteEntity = async (id) => {

    try {
        const entity = await Department.findByIdAndDelete(id);
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