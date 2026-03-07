const mongos = require('mongoose');
const { Todo } = require('../model');

const getEntities = async (searchParams) => {

    try {
        let filters = {...searchParams};
        delete filters.skip;
        delete filters.limit;
    
        const {skip, limit} = searchParams;
        const entities = await Todo.find(filters).lean();
    
        return entities;

    } catch (error) {
        throw error;
    }
}

const getEntityById = async (id) => { 

    try {
        const entity = await Todo.findById(id).lean();
        return entity;

    } catch (error) {
        throw error;
    }
}

const createEntity = async (data) => {

    try {
        const entity = new Todo(data);
        await entity.save();
        return entity.toObject();

    } catch (error) {
        throw error;
    }
}

const patchEntity = async (filters, data) => {

    try {
        const entity = await Todo.findOneAndUpdate(filters, data, {new: true});
        return entity.toObject();

    } catch (error) {
        throw error;
    }
}

const deleteEntity = async (id) => {

    try {
        const entity = await Todo.findByIdAndDelete(id);
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
};