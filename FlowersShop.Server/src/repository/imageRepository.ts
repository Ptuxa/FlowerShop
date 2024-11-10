import { RowDataPacket } from "mysql2";
import db from "../configuration/mysqlDb";
import { Image } from "../model/entity/image";

export class ImageRepository {
    private async create(image: Image): Promise<Image> {
        try {
            await db.query(
                "INSERT INTO images (id, path) VALUES (?, ?)",
                [image.id, image.path]
            );
        } catch (error) {
            throw new Error("Save image error: " + error);
        }

        return Promise.resolve(image);
    }

    private async update(image: Image): Promise<Image> {
        try {
            await db.query(
                `UPDATE images SET path = ? WHERE id = ?`,
                [image.path, image.id]
            );
        } catch (error) {
            throw new Error("Update image error: " + error);
        }

        return Promise.resolve(image);
    }

    public async getImageById(id: string): Promise<Image> {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `path` FROM `images` WHERE `id` = ?",
                [id]
            );
        } catch (error) {
            throw new Error("Get image by id error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("Image not found");
        }

        const image: Image = {
            id: rows[0].id,
            path: rows[0].path,
        };

        return Promise.resolve(image);
    }

    public async getAll(): Promise<Image[]> {
        let rows: RowDataPacket[];

        try {
            [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `images`");
        } catch (error) {
            throw new Error("Get all image error: " + error);
        }

        const images: Image[] = rows.map((row: any) => ({
            id: row.id,
            path: row.path,
        }));

        return Promise.resolve(images);
    }

    public async save(image: Image): Promise<Image> {
        let isExistImage: Boolean = true;

        try {
            await this.getImageById(image.id);
        } catch (error) {
            isExistImage = false;
        }

        try {
            if (isExistImage) {
                return Promise.resolve(await this.update(image));
            }

            return Promise.resolve(await this.create(image));
        } catch (error) {
            throw error;
        }
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await this.getImageById(id);
        } catch (error) {
            throw error;
        }

        try {
            await db.query("DELETE FROM images WHERE id = ?", id);
        } catch (error) {
            throw new Error("Delete image error: " + error);
        }
    }
}