import express, { Router } from "express";
import AuthenticationController from "../../controller/authenticationController";
import { AuthMiddleware } from "../middleware/authMiddleware";

class AuthenticationRouter {
    private readonly authenticationController;
    private readonly authMiddleware;
    private readonly router;

    constructor(authenticationController: AuthenticationController, authMiddleware: AuthMiddleware) {
        this.authenticationController = authenticationController;
        this.authMiddleware = authMiddleware;
        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.post("/sign-in", this.authenticationController.signInUser);
        this.router.post("/sign-up", this.authenticationController.signUpUser);
        this.router.post("/logout", this.authMiddleware.authenticate, this.authenticationController.logoutUser);
        this.router.post("/update-access-token", this.authenticationController.updateAccessToken);

        return this.router;
    }
}

export default AuthenticationRouter;