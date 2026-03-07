const { departmentDao } = require('../DAO');

const getDepartmentList = async (searchParams) => {
    const data = await departmentDao.getEntities(searchParams);
    return data;
}

const getDepartmentById = async (id) => {
    const data = await departmentDao.getEntityById(id);
    return data;
}

const createDepartment = async (data) => {
    const createDepartment = await departmentDao.createEntity(data);
    return createDepartment;
}

const updateDepartment = async (filters, data) => {
    const updateDepartment = await departmentDao.patchEntity(filters, data);
    return updateDepartment;
}

const deleteDepartment = async (id) => {
    const deleteDepartment = await departmentDao.deleteEntity(id);
    return deleteDepartment;
}

module.exports = {
    getDepartmentList,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
};