const mongoose = require('mongoose');
require('dotenv').config();

const {MONGO_URI} = process.env;

// Creqte dtabase connection 
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Database Connected...');

    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
  
}

module.exports = connectDB;