import express, { Router } from "express";
import AuthenticationController from "../../controller/authenticationController";

class AuthenticationRouter {
    private readonly authenticationController;
    private readonly router;

    constructor(authenticationController: AuthenticationController) {
        this.authenticationController = authenticationController;
        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.post("/sign-in", this.authenticationController.signInUser);
        this.router.post("/sign-up", this.authenticationController.signUpUser);
        this.router.post("/logout", this.authenticationController.logoutUser);
        this.router.post("/updateAccessToken", this.authenticationController.updateAccessToken);

        return this.router;
    }
}

export default AuthenticationRouter;