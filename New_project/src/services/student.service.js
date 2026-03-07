const { getJsonFromCsvFile } = require('../core/utils');
const path = require('path');
const fs = require('fs');

const fileURLToPath = path.join(__dirname, '../metadata/studentData.csv');
const csvData = fs.readFileSync(fileURLToPath, 'utf-8');

const getStudentData = async (searchParams) => {    

    try {
        const data = await getJsonFromCsvFile(csvData, searchParams);
        return data;

    } catch (error) {
        console.error('Error fetching student data:', error);
        throw error;
    }

};

const getStudentById = async (id) => {

    try {

        const data = await getJsonFromCsvFile(csvData);
        const student = data.find(student => student.id === id);

        if(!student) {
            throw new Error('Student not found');
        }

        return student;

    } catch (error) {
        console.error('Error fetching student by ID:', error);
        throw error;
    }
}

module.exports = {
    getStudentData,
    getStudentById
};