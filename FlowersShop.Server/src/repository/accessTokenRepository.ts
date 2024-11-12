import pool from "../configuration/redisDb";
import { AccessToken } from "../model/entity/accessToken";

export class AccessTokenRepository {
    private readonly keyPrefix = "accessToken:";
    private readonly keyPostfix = "";



    private createKey(userId: string): string {
        return `${this.keyPrefix}:${userId}:${this.keyPostfix}`
    }
    
    public async save(accessToken: AccessToken): Promise<AccessToken> {
        const key = this.createKey(accessToken.userId);

        try {            
            await pool.setAsync(key, accessToken.value);
            await pool.expireatAsync(key, accessToken.expirationTimestamp);                        
        } catch (error) {            
            throw new Error(`Error: access token save ${(error as Error).message}`);
        }

        return accessToken;
    }

    public async getAccessTokenByUserId(userId: string): Promise<AccessToken> {
        const key = this.createKey(userId);
        let value: string | null | undefined;                
                        
        const expiryTime = await pool.ttlAsync(key);
        const expirationTimestamp = Math.floor(Date.now() / 1000);

        if (expiryTime === -1) {
            throw Error(`Error: access token with id=${userId} haven't expiry time preset`);            
        } else if (expiryTime === -2) {
            throw Error(`Error: access token with id=${userId} doesn't exist`);                        
        }

        try {            
            value = await pool.getAsync(key);                                  
        } catch (error) {            
            throw new Error(`Error: ${(error as Error).message}`);
        }

        if (value === null || value === undefined) {
            throw Error(`Error: access token with id=${userId} haven't any data`);    
        }
        
        const accessToken: AccessToken = {
            userId: userId,
            value: value,
            expirationTimestamp: expirationTimestamp
        }

        return accessToken;
    }

    public async deleteByUserId(userId: string): Promise<void> {
        const key = this.createKey(userId);

        try {            
            await pool.delAsync(key);                                  
        } catch (error) {            
            throw new Error(`Error: access token delete: ${(error as Error).message}`);
        }
    }
}
