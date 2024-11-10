import express, { Router } from 'express'
import ImageController from '../../controller/imageController';

class ImageRouter {
    private readonly imageController;
    private readonly router;

    constructor(
        imageController: ImageController,
    ) {
        this.imageController = imageController;

        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.get("/:id", this.imageController.getImageById);
        this.router.get("/", this.imageController.getAllImages);
        this.router.post("/", this.imageController.createImage);
        this.router.put("/:id", this.imageController.updateImage);
        this.router.delete("/:id", this.imageController.deleteImage);

        return this.router;
    }
}

export default ImageRouter;