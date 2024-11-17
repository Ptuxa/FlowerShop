import { LoadImageResponse } from "../model/dto/response/loadImageResponse";
import { ImageService } from "../service/impl/imageService";
import { Request, Response } from 'express';

class ImageController {
    private readonly imageService: ImageService;
    

    constructor(imageService: ImageService) {
        this.imageService = imageService;
    }

    public loadImage = async (req: Request, res: Response): Promise<void> => {
        try {
            const loadImageResponse: LoadImageResponse = await this.imageService.loadImage(req.file);
            res.status(201).json(loadImageResponse);
        } catch (error) {
            res.status(500).json({ message: `Error load image: ${(error as Error).message}` });
        }
    } 

    public deleteImage = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.imageService.deleteImage(req.params.filename);
            res.status(201).send();
        } catch (error) {
            res.status(500).json({ message: `Error load image: ${(error as Error).message}` });
        }
    };

    public getImageByFileName = async (req: Request, res: Response): Promise<void> => {
        try {
            const filePath: string = await this.imageService.getImageByFileName(req.params.filename);
            res.sendFile(filePath, (sendErr) => {
                if (sendErr) {
                    throw new Error("Failed to receive image");
                }
            });
        } catch (error) {
            res.status(500).json({ message: `Error load image: ${(error as Error).message}` });
        }        
    };
}

export default ImageController;