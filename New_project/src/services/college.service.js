const { collegeDao } = require('../DAO');

const getColleges = async (searchParams) => {
    try{
        const colleges = await collegeDao.getEntities(searchParams);
        return {
            colleges,
            status: 200,
        }; 
    } catch(err) {
        throw err;
    }
}

const getCollegeById = async (id) => {
    const data = await collegeDao.getEntityById(id);
    return data;
}

const createCollege = async (data) => {
    const createCollege = await collegeDao.createEntity(data);
    return createCollege;
}

const updateCollege = async (filters, data) => {
    const updateCollege = await collegeDao.patchEntity(filters, data);
    return updateCollege;
}

const deleteCollege = async (id) => {
    const deleteCollege = await collegeDao.deleteEntity(id);
    return deleteCollege;
}

module.exports = {
    getColleges,
    getCollegeById,
    createCollege,
    updateCollege,
    deleteCollege
};