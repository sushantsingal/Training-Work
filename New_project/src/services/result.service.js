const { resultDao } = require('../DAO');

const getResultList = async (searchParams) => {
    const data = await resultDao.getEntities(searchParams);
    return data;
}

const getResultById = async (id) => {
    const data = await resultDao.getEntityById(id);
    return data;
}

const createResult = async (data) => {
    resultDao.subject = data.subjects.map(subject => {
        result.totalMarks = result.totalMarks + subject.marks;
        return {
            ...subject,
            grade,
        };
    });

    result.percentage = (result.totalMarks / (data.subjects.length * 100)) * 100;

    result.overallGrades = calculateGrads(result.percentage);
    result.status = result.overallGrades !== 'F' ? 'Pass' : 'Fail';
}

const updateResult = async (filters, data) => {
    const updateResult = await resultDao.patchEntity(filters, data);
    return updateResult;
}

const deleteResult = async (id) => {
    const deleteResult = await resultDao.deleteEntity(id);
    return deleteResult;
}

module.exports = {
    getResultList,
    getResultById,
    createResult,
    updateResult,
    deleteResult
};