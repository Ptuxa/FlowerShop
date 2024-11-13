import { Request, Response } from 'express';
import { AuthenticationService } from '../service/impl/authenticationService';
import { SignInRequest } from '../model/dto/request/signInRequest';
import { SignInResponse } from '../model/dto/response/signInResponse';
import { SignUpRequest } from '../model/dto/request/signUpRequest';

class AuthenticationController {
    private readonly authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    public signInUser = async (req: Request, res: Response): Promise<void> => {
        const signInRequest: SignInRequest = req.body;

        try {
            const signInResponse: SignInResponse = await this.authenticationService.signInUser(signInRequest);
            res.status(200).json(signInResponse);
        } catch (error) {
            res.status(400).json({ message: `Error sign in: ${(error as Error).message}` });
        }
    }

    public signUpUser = async (req: Request, res: Response): Promise<void> => {
        const signUpRequest: SignUpRequest = req.body;

        try {
            await this.authenticationService.signInUser(signUpRequest);
            res.status(200).send();
        } catch (error) {
            res.status(400).json({ message: `Error sign up: ${(error as Error).message}` });
        }
    }

    public logoutUser = async (req: Request, res: Response): Promise<void> => {
        const userId = req.authentication?.userId;

        if (userId === undefined) {
            throw Error("Undefined userId when user logout");
        }

        try {
            await this.authenticationService.logoutUser(userId);
            res.status(200).send();
        } catch (error) {
            res.status(400).json({ message: `Error logout user: ${(error as Error).message}` });
        }
    }

    public updateAccessToken = async (req: Request, res: Response): Promise<void> => {
        const refreshTokenValue: string = req.body;
        
        try {
            const accessTokenValue: string = await this.authenticationService.updateAccessToken(refreshTokenValue);
            res.status(200).json(accessTokenValue);
        } catch (error) {
            res.status(400).json({ message: `Error update access token: ${(error as Error).message}` });
        }
    }
}

export default AuthenticationController;