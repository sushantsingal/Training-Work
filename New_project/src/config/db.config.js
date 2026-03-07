const mongos = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {

    try {
        const conn = await mongos.connect(process.env.MONGO_URI, {dbname: 'studentApp'});
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};    

module.exports = {connectDB};