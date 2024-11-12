import Redis, { RedisOptions } from "ioredis";
import dotenv from 'dotenv';
import { promisify } from "util";

dotenv.config();

export class RedisClientAsync extends Redis {
    constructor(options: RedisOptions) {
        super(options);

        this.getAsync = promisify(this.get).bind(this);
        this.setAsync = promisify(this.set).bind(this);
        this.expireatAsync = promisify(this.expireat).bind(this);
        this.ttlAsync = promisify(this.ttl).bind(this);
    }

    public ttlAsync;
    public getAsync;
    public setAsync;
    public expireatAsync;

    public async delAsync(key: string): Promise<number | undefined> {
        return new Promise((resolve, reject) => {
            this.del(key, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

const pool = new RedisClientAsync({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT || "6379"), 
    password: process.env.REDIS_PASSWORD || undefined, 
    db: Number(process.env.REDIS_DB || "0"), 
    maxRetriesPerRequest: 1,
    retryStrategy: (times) => Math.min(times * 50, 2000),
});

pool.on("connect", () => {
    console.log("Connection to Redis has been successful.");
});

pool.on("error", (err) => {
    console.error("Failed to connect to Redis pool: ", err);
});

export default pool;
    