import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
let pool: mysql.Pool;

try {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} catch(error) {
    throw new Error(`Create pool exception: ${error}`);
}

export default pool;
