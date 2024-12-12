import express, { Router } from "express";
import AuthenticationController from "../../controller/authenticationController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { UPDATE_ACCESS_TOKEN_ROUTE } from "../../service/utils/authenticationFunctions";

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
        this.router.post(UPDATE_ACCESS_TOKEN_ROUTE, this.authenticationController.updateAccessToken);

        return this.router;
    }
}

export default AuthenticationRouter;