import { Request, Response } from "express";
import { AuthenticationService } from "../service/impl/authenticationService";
import { SignInRequest } from "../model/dto/request/signInRequest";
import { TokensDataForCookies } from "../model/dto/response/signInCookiesResponse";
import { SignUpRequest } from "../model/dto/request/signUpRequest";
import { UpdateAccessTokenRequest } from "../model/dto/request/updateAccessTokenRequest";
import { AccessTokenDataForCookies } from "../model/dto/response/updateAccessTokenResponse";
import {
    clearTokensDataInCookiesResponse,
    setAccessTokenDataInCookiesResponse,
    setTokensDataInCookiesResponse,
} from "../service/utils/authenticationFunctions";

class AuthenticationController {
    private readonly authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    public signInUser = async (req: Request, res: Response): Promise<void> => {
        const signInRequest: SignInRequest = req.body;

        try {
            const tokensDataForCookies: TokensDataForCookies = await this.authenticationService.signInUser(
                signInRequest
            );

            res = setTokensDataInCookiesResponse(res, tokensDataForCookies);

            res.status(200).send();
        } catch (error) {
            res.status(400).json({ message: `Error sign in: ${(error as Error).message}` });
        }
    };

    public signUpUser = async (req: Request, res: Response): Promise<void> => {
        const signUpRequest: SignUpRequest = req.body;

        try {
            await this.authenticationService.signUpUser(signUpRequest);
            res.status(200).send();
        } catch (error) {
            res.status(400).json({ message: `Error sign up: ${(error as Error).message}` });
        }
    };

    public logoutUser = async (req: Request, res: Response): Promise<void> => {
        // const userId = (req as Request & { authentication: { userId: string } }).authentication?.userId;
        const userId = req.authentication?.userId;

        try {
            await this.authenticationService.logoutUser(userId);

            res = clearTokensDataInCookiesResponse(res);
            res.status(200).send();
        } catch (error) {
            res.status(400).json({ message: `Error logout user: ${(error as Error).message}` });
        }
    };

    public updateAccessToken = async (req: Request, res: Response): Promise<void> => {
        const refreshTokenValue: string = req.cookies.refreshTokenValue;

        try {
            const accessTokenDataForCookies: AccessTokenDataForCookies =
                await this.authenticationService.updateAccessToken(refreshTokenValue);

            res = setAccessTokenDataInCookiesResponse(res, accessTokenDataForCookies);
            res.status(200).send();
        } catch (error) {
            res.status(400).json({ message: `Error update access token: ${(error as Error).message}` });
        }
    };
}

export default AuthenticationController;
