import redis from "../configuration/redisDb";

export class AccessTokenRepository {
    async findByUserId(userId: number): Promise<string> {
        const accessToken = await redis.get(`access_token:${userId}`);

        throw new Error("")
    }

    // async deleteByUserId(userId: number): Promise<string | null> { //TODO: deleteByUserId

    // }
}
