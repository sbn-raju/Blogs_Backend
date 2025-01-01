const pkg = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const { Pool } = pkg;

const connnections = {
    host: process.env.DB_LOCALHOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE_NAME,
}

//Trying it to connect to the Database As the database is the other contentiant
//Creating the Object of Pool 
const pool = new Pool(connnections);



//This Function will return the connection of the database wheather it is connected or not 
const connectToDatabase = async () => {
    try {
        const connection = await pool.connect();
        console.log(`Server is successfully connected to ${connection.database} database`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    pool,
    connectToDatabase
}