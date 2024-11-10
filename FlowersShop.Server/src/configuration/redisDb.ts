import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10), 
    password: process.env.REDIS_PASSWORD || undefined, 
    db: parseInt(process.env.REDIS_DB || "0", 10), 
});

redis.on("connect", () => {
    console.log("Connection to Redis has been successful.");
});

redis.on("error", (err) => {
    console.error("Failed to connect to Redis: ", err);
});

export default redis;
