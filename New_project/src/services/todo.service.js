const {todoDao} = require('../DAO');

const getTodoList = async (searchParams) => {
    const data = await todoDao.getEntities(searchParams);
    return data;
}

const getTodoById = async (id) => {
    const data = await todoDao.getEntityById(id);
    return data;
}

const createTodo = async (data) => {
    const createTodo = await todoDao.createEntity(data);
    return createTodo;
}

const updateTodo = async (filters, data) => {
    const updateTodo = await todoDao.patchEntity(filters, data);
    return updateTodo;
}

const deleteTodo = async (id) => {
    const deleteTodo = await todoDao.deleteEntity(id);
    return deleteTodo;
}

module.exports = {
    getTodoList,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};