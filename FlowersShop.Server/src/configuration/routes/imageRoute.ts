import express, { Router } from "express";
import ImageController from "../../controller/imageController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { EnumUserRole } from "../../model/enum/enumUserRole";

class ImageRouter {
    private readonly imageController: ImageController;
    private readonly authMiddleware: AuthMiddleware;
    private readonly router: Router;

    constructor(imageController: ImageController, authMiddleware: AuthMiddleware) {
        this.imageController = imageController;
        this.authMiddleware = authMiddleware;

        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.get(
            "/:id",
            this.imageController.getImageById
        );
        this.router.get(
            "/",
            this.imageController.getAllImages
        );
        this.router.post(
            "/",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.imageController.createImage
        );
        this.router.put(
            "/:id",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.imageController.updateImage
        );
        this.router.delete(
            "/:id",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.imageController.deleteImage
        );

        return this.router;
    }
}

export default ImageRouter;
