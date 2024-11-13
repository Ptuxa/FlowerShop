import { RowDataPacket } from "mysql2";
import db from "../configuration/mysqlDb";
import { RefreshToken } from "../model/entity/refreshToken";

export class RefreshTokenRepository {
    private async create(refreshToken: RefreshToken): Promise<RefreshToken> {
        try {
            await db.query("INSERT INTO refreshTokens (id, value, expiration_timestamp, user_id) VALUES (?, ?, ?, ?)", [
                refreshToken.id,
                refreshToken.value,
                refreshToken.expirationTimestamp,
                refreshToken.userId,
            ]);
        } catch (error) {
            throw new Error("Save refreshToken error: " + error);
        }

        return Promise.resolve(refreshToken);
    }

    private async update(refreshToken: RefreshToken): Promise<RefreshToken> {
        try {
            await db.query(`UPDATE refreshTokens SET value = ?, expiration_timestamp = ?, user_id = ? WHERE id = ?`, [
                refreshToken.value,
                refreshToken.expirationTimestamp,
                refreshToken.userId,
                refreshToken.id,
            ]);
        } catch (error) {
            throw new Error("Update refreshToken error: " + error);
        }

        return Promise.resolve(refreshToken);
    }

    public async getRefreshTokenById(id: string): Promise<RefreshToken> {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `value`, `expiration_timestamp`, `user_id` FROM `refreshTokens` WHERE `id` = ?",
                [id]
            );
        } catch (error) {
            throw new Error("Get refreshToken by id error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("RefreshToken not found");
        }

        const refreshToken: RefreshToken = {
            id: rows[0].id,
            value: rows[0].value,
            expirationTimestamp: rows[0].expiration_timestamp,
            userId: rows[0].user_id,
        };

        return Promise.resolve(refreshToken);
    }

    public async getRefreshTokenByUserId(userId: string): Promise<RefreshToken> {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `value`, `expiration_timestamp`, `user_id` FROM `refreshTokens` WHERE `user_id` = ?",
                [userId]
            );
        } catch (error) {
            throw new Error("Get refreshToken by user id error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("RefreshToken not found");
        }

        const refreshToken: RefreshToken = {
            id: rows[0].id,
            value: rows[0].value,
            expirationTimestamp: rows[0].expiration_timestamp,
            userId: rows[0].user_id,
        };

        return Promise.resolve(refreshToken);
    }

    public async getRefreshTokenByValue(value: string): Promise<RefreshToken> {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `value`, `expiration_timestamp`, `user_id` FROM `refreshTokens` WHERE `value` = ?",
                [value]
            );
        } catch (error) {
            throw new Error("Get refreshToken by value error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("RefreshToken not found");
        }

        const refreshToken: RefreshToken = {
            id: rows[0].id,
            value: rows[0].value,
            expirationTimestamp: rows[0].expiration_timestamp,
            userId: rows[0].user_id,
        };

        return Promise.resolve(refreshToken);
    }

    public async getAll(): Promise<RefreshToken[]> {
        let rows: RowDataPacket[];

        try {
            [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `refreshTokens`");
        } catch (error) {
            throw new Error("Get all refreshToken error: " + error);
        }

        const refreshTokens: RefreshToken[] = rows.map((row: any) => ({
            id: row.id,
            value: row.value,
            expirationTimestamp: row.expiration_timestamp,
            userId: row.user_id,
        }));

        return Promise.resolve(refreshTokens);
    }

    public async save(refreshToken: RefreshToken): Promise<RefreshToken> {
        let isExistRefreshToken: Boolean = true;

        try {
            await this.getRefreshTokenById(refreshToken.id);
        } catch (error) {
            isExistRefreshToken = false;
        }

        try {
            if (isExistRefreshToken) {
                return Promise.resolve(await this.update(refreshToken));
            }

            return Promise.resolve(await this.create(refreshToken));
        } catch (error) {
            throw error;
        }
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await this.getRefreshTokenById(id);
        } catch (error) {
            throw error;
        }

        try {
            await db.query("DELETE FROM refreshTokens WHERE id = ?", id);
        } catch (error) {
            throw new Error("Delete refreshToken error: " + error);
        }
    }

    public async deleteByUserId(userId: string): Promise<void> {
        try {
            await db.query("DELETE FROM refreshTokens WHERE user_id = ?", userId);
        } catch (error) {
            throw new Error("Delete refreshToken error: " + error);
        }
    }
}
