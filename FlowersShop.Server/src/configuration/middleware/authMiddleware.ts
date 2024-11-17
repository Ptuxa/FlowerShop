import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyAccessToken } from "../../service/utils/authenticationFunctions";
import { RefreshTokenRepository } from "../../repository/refreshTokenRepository";
import { AccessTokenRepository } from "../../repository/accessTokenRepository";
import { RefreshToken } from "../../model/entity/refreshToken";
import { UserRepository } from "../../repository/userRepository";
import { User } from "../../model/entity/user";

dotenv.config();

export class AuthMiddleware {
    private readonly HEADER_AUTH_START_NAME: string = "Bearer ";
    private readonly userRepository: UserRepository;
    private readonly accessTokenRepository: AccessTokenRepository;
    private readonly refreshTokenRepository: RefreshTokenRepository;

    constructor(
        userRepository: UserRepository,
        accessTokenRepository: AccessTokenRepository,
        refreshTokenRepository: RefreshTokenRepository
    ) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.accessTokenRepository = accessTokenRepository;
    }

    public authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization;

        if (authHeader === undefined || !authHeader.startsWith(this.HEADER_AUTH_START_NAME)) {
            res.status(403).json({ message: "Authentication is required." });
            return;
        }

        let accessTokenValue = authHeader?.substring(this.HEADER_AUTH_START_NAME.length);

        if (accessTokenValue === undefined) {
            throw Error("Error: accessTokenValue cannot be undefined");
        }

        let decodedAccessToken: string | jwt.JwtPayload = "";

        try {
            decodedAccessToken = verifyAccessToken(accessTokenValue);
        } catch (err) {
            res.status(403).json({ message: `Invalid access token ${err}` });
            return;
        }

        req.authentication = {
            userId: (decodedAccessToken as jwt.JwtPayload).userId,
            expirationTimestamp: (decodedAccessToken as jwt.JwtPayload).expirationTimestamp
        };

        try {
            accessTokenValue = await this.accessTokenRepository.getAccessTokenValueByUserId(req.authentication.userId);
        } catch (err) {
            res.status(403).json({ message: `Invalid access token ${err}` });
            return;
        }

        try {
            decodedAccessToken = verifyAccessToken(accessTokenValue);
        } catch (err) {
            res.status(403).json({ message: `Invalid access token ${err}` });
            return;
        }

        if ((decodedAccessToken as jwt.JwtPayload).expirationTimestamp !== req.authentication.expirationTimestamp) {
            res.status(403).json({ message: `Invalid access token` });     
            return;       
        }

        let refreshToken: RefreshToken | null;
        try {
            refreshToken = await this.refreshTokenRepository.getRefreshTokenByUserId(req.authentication.userId);
        } catch (err) {
            res.status(403).json({ message: `Invalid refresh token ${err}` });
            return;
        }

        const currentTimestamp: number = Math.floor(Date.now() / 1000);

        if (currentTimestamp > (refreshToken as RefreshToken).expirationTimestamp) {
            res.status(403).json({ message: `Refresh token is expired.` });
            return;
        } else {
            next();
        }        
    };

    public authorize = (requiredRoles: string[]) => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const userId = req.authentication?.userId;

            if (userId === undefined) {
                res.status(403).json({ message: "Undefined user" });
                return;
            }

            let user: User | null;
            try {
                user = await this.userRepository.getUserById(userId);
            } catch (err) {
                res.status(403).json({ message: `Undefined user ${err}` });
                return;
            }

            if (!requiredRoles.includes(user.role.toString())) {
                res.status(403).json({ message: "Access denied" });
                return;
            }

            next();
        };
    };
}
