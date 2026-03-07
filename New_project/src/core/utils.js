const fs = require('fs');
const path = require('path');

const getJsonFromCsvFile = async(csvData, searchParams) => {

    try {
        
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');

        lines.shift();
        lines.pop();

        const jsonData = lines.map(line => {

            const values = line.split(',');
            const obj = {};

            headers.forEach((header, index) => {
                obj[header] = values[index];
            });

            return obj;
        });

        if (searchParams && Object.keys(searchParams).length > 0) {
            jsonData.filter(obj => {
                for (const key in searchParams) {
                    if (obj[key] !== searchParams[key]) {
                        return false;
                    }
                }
                return true;
            });
        }

        else {
            return jsonData;
        }

        // console.log('JSON Data:', jsonData);
        return jsonData;
    }

    catch (error) {
        console.error('Error reading CSV file:', error);
        throw error;
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.getSalt(saltRounds);
    const hashPassword = await bcrypt.getSalt
}

const getPrivateKey = () => {
    return fs.readFileSync(path.join(__dirname, '../config/privateKey.pem'), 'utf-8');   
}

const getPublicKey = () => {
    return fs.readFileSync(path.join(__dirname, '../config/publicKey.pem'), 'utf-8');
}

module.exports = {
    getJsonFromCsvFile,
    hashPassword,
    getPrivateKey,
    getPublicKey
}