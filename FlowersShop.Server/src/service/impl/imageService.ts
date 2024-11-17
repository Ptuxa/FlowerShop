import { ImageMapper } from "../mapper/imageMapper";
import fs from "fs";
import { LoadImageResponse } from "../../model/dto/response/loadImageResponse";
import path from "path";

export class ImageService {
    private readonly imageMapper: ImageMapper;
    private readonly imageFolderPath: string;

    constructor(imageMapper: ImageMapper, imageFolderPath: string) {
        this.imageMapper = imageMapper;
        this.imageFolderPath = imageFolderPath;
    }

    public async loadImage(file: Express.Multer.File | undefined): Promise<LoadImageResponse> {
        if (!file) {
            throw new Error("File is undefined");
        }

        return this.imageMapper.toLoadImageResponse(file);
    }

    public async deleteImage(filename: string): Promise<void> {
        const filePath = path.join(this.imageFolderPath, filename);
            
        await new Promise<void>((resolve, reject) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return reject(new Error(`File not found: ${filename}`));
                }
                resolve();
            });
        });

        
        await new Promise<void>((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return reject(new Error(`Failed to delete file: ${filename}`));
                }
                resolve();
            });
        });       
    }

    public async getImageByFileName(fileName: string): Promise<string> {
        if (!fileName) {
            throw new Error("Filename is unndefined");            
        }

        const filePath = path.join(this.imageFolderPath, fileName);
        
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                throw new Error("File not found");   
            }
        });

        return filePath;
    }
}