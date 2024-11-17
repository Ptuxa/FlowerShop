import express, { Router } from "express";
import ImageController from "../../controller/imageController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { EnumUserRole } from "../../model/enum/enumUserRole";
import { ImageMiddleware } from "../middleware/imageMiddleware";

class ImageRouter {
    private readonly imageController: ImageController;
    private readonly authMiddleware: AuthMiddleware;
    private readonly imageMiddleware: ImageMiddleware;
    private readonly router: Router;

    constructor(imageController: ImageController, authMiddleware: AuthMiddleware, imageMiddleware: ImageMiddleware) {
        this.imageController = imageController;
        this.authMiddleware = authMiddleware;
        this.imageMiddleware = imageMiddleware;

        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.post(
            "/",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.imageMiddleware.getMiddleware().single("image"),
            this.imageController.loadImage
        );

        this.router.delete(
            "/:filename",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),            
            this.imageController.deleteImage
        );

        this.router.get(
            "/:filename",        
            this.imageController.getImageByFileName
        );

        return this.router;
    }
}

export default ImageRouter;
