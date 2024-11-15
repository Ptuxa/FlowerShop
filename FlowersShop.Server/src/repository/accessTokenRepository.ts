import pool from "../configuration/redisDb";
import { AccessToken } from "../model/entity/accessToken";

export class AccessTokenRepository {
    private readonly keyPrefix = "accessToken";
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

    public async getAccessTokenValueByUserId(userId: string): Promise<string> {
        const key = this.createKey(userId);        
                        
        const expiryTime = await pool.ttlAsync(key);        

        if (expiryTime === -1) {
            throw Error(`Error: access token with id=${userId} haven't expiry time preset`);            
        } else if (expiryTime === -2) {
            throw Error(`Error: access token with id=${userId} doesn't exist`);                        
        }

        let value: string | null | undefined;       
        try {            
            value = await pool.getAsync(key);                                  
        } catch (error) {            
            throw new Error(`Error: ${(error as Error).message}`);
        }

        if (value === null || value === undefined) {
            throw Error(`Error: access token with id=${userId} haven't any data`);    
        }

        return value;
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
