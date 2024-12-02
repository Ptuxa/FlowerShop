import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";


export class ImageMiddleware {
    private readonly ALLOWED_TYPES: string[] = ["image/jpeg", "image/png"];
    
    private FILE_SIZE_MAX = 1 * 1024 * 1024
    private uploadMiddleware: multer.Multer;

    constructor(imageFolderPath: string) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, imageFolderPath);
            },
            filename: (req, file, cb) => {
                cb(null, uuid() + path.extname(file.originalname));
            },
        });        
        
        this.uploadMiddleware = multer({
            storage,
            fileFilter: this.fileFilter,
            limits: { fileSize: this.FILE_SIZE_MAX},
        });
    }

    private fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (this.ALLOWED_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file format"));
        }
    };

    public errorProcessing = (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.status(400).json({ error: 'File is too large' });
                return;
            } else {
                res.status(400).json({ error: err.message });
                return;
            }
        } else if (err instanceof Error) {
            res.status(400).json({ error: err.message });
            return;
        } else {
            next(err);
        }
    }

    public getMiddleware(): multer.Multer {
        return this.uploadMiddleware;
    }
}

