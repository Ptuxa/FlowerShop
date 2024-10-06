import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DB_NAME, 
});

connection.connect((err) => {
    if (err) {
        console.error("Failed to connect to MySql: ", err);
        return;
    }
    console.log("Connection to MySql has been successful.");
});

export default connection;
