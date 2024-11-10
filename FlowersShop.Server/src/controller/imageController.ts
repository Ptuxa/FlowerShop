import { ImageRequest } from "../model/dto/request/imageRequest";
import { ImageService } from "../service/impl/imageService";
import { Request, Response } from 'express';

class ImageController {
    private imageService: ImageService;

    constructor(imageService: ImageService) {
        this.imageService = imageService;
    }

    public getImageById = async (req: Request, res: Response): Promise<void> => {
        try {
            const imageResponse = await this.imageService.getImageById(req.params.id);
            res.status(200).json(imageResponse);
        } catch (error) {
            res.status(404).json({ message: `Image not found: ${(error as Error).message}` });
        }
    };

    public getAllImages = async (_req: Request, res: Response): Promise<void> => {
        try {
            const imagesResponse = await this.imageService.getAllImages();
            res.status(200).json(imagesResponse);
        } catch (error) {
            res.status(500).json({ message: `Error retrieving images: ${(error as Error).message}` });
        }
    };

    public createImage = async (req: Request, res: Response): Promise<void> => {
        try {
            const imageRequest: ImageRequest = req.body;
            const newImage = await this.imageService.createImage(imageRequest);
            res.status(201).json(newImage);
        } catch (error) {
            res.status(400).json({ message: `Error creating image: ${(error as Error).message}` });
        }
    };

    public updateImage = async (req: Request, res: Response): Promise<void> => {
        try {
            const imageRequest: ImageRequest = req.body;
            const updatedImage = await this.imageService.updateImage(req.params.id, imageRequest);
            res.status(200).json(updatedImage);
        } catch (error) {
            res.status(400).json({ message: `Error updating image: ${(error as Error).message}` });
        }
    };

    public deleteImage = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.imageService.deleteImage(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: `Error deleting image: ${(error as Error).message}` });
        }
    };
}

export default ImageController;