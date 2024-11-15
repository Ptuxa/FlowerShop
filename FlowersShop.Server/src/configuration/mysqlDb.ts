import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool: mysql.Pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    waitForConnections: true,
    connectionLimit: 40,
    queueLimit: 0
});

(async () => {
    let connection: mysql.PoolConnection;
    try {
        connection = await pool.getConnection();   
        connection.release();            
    } catch (error) {
        throw Error(`Create pool MySQL exception: ${error}`);
    }

    console.log("Connection to MySQL has been successful.");
})()

export default pool;
