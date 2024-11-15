import { SignInRequest } from "../../model/dto/request/signInRequest";
import { SignUpRequest } from "../../model/dto/request/signUpRequest";
import { SignInResponse } from "../../model/dto/response/signInResponse";
import { User } from "../../model/entity/user";
import { AccessTokenRepository } from "../../repository/accessTokenRepository";
import { RefreshTokenRepository } from "../../repository/refreshTokenRepository";
import { UserRepository } from "../../repository/userRepository";
import { SignInMapper } from "../mapper/signInMapper";
import { SignUpMapper } from "../mapper/signUpMapper";
import {
    checkPassword,
    generateAccessTokenValue,
    generateRefreshTokenValue,
    hashPassword,
    verifyAccessToken,
} from "../utils/authenticationFunctions";
import { RefreshToken} from "../../model/entity/refreshToken"
import { UpdateAccessTokenRequest } from "../../model/dto/request/updateAccessTokenRequest";
import { UpdateAccessTokenMapper } from "../mapper/updateAccessTokenMapper";
import { UpdateAccessTokenResponse } from "../../model/dto/response/updateAccessTokenResponse";
import { AccessToken } from "../../model/entity/accessToken";
import jwt from "jsonwebtoken";

export class AuthenticationService {
    private readonly userRepository: UserRepository;
    private readonly accessTokenRepository: AccessTokenRepository;
    private readonly refreshTokenRepository: RefreshTokenRepository;
    private readonly signInMapper: SignInMapper;
    private readonly signUpMapper: SignUpMapper;
    private readonly updateAccessTokenMapper: UpdateAccessTokenMapper;

    constructor(
        userRepository: UserRepository,
        accessTokenRepository: AccessTokenRepository,
        refreshTokenRepository: RefreshTokenRepository,
        signInMapper: SignInMapper,
        signUpMapper: SignUpMapper,
        updateAccessTokenMapper: UpdateAccessTokenMapper
    ) {
        this.userRepository = userRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.signInMapper = signInMapper;
        this.signUpMapper = signUpMapper;
        this.updateAccessTokenMapper = updateAccessTokenMapper;
    }

    public async signInUser(signInRequest: SignInRequest): Promise<SignInResponse> {
        let user: User | null;

        try {
            user = await this.userRepository.getUserByEmail(signInRequest.email);
        } catch (error) {
            throw new Error(`Error in AuthenticationService signInUser: ${(error as Error).message}`);
        }

        if (!(await checkPassword(signInRequest.password, user.password))) {
            throw new Error("Error in AuthenticationService signUpUser: " + " invalid password");
        }

        const currentTimestamp: number = Math.floor(Date.now() / 1000);

        const expirationAccessTokenTimestamp: number = currentTimestamp + Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
        const accessTokenValue: string = generateAccessTokenValue(user, expirationAccessTokenTimestamp);

        try {
            await this.accessTokenRepository.save(
                this.signInMapper.toAccessToken(user.id, accessTokenValue, expirationAccessTokenTimestamp)
            );
        } catch (error) {
            throw new Error("Error in AuthenticationService signInUser: " + error);
        }

        const refreshTokenValue: string = generateRefreshTokenValue();
        const expirationRefreshTokenTimestamp = currentTimestamp + Number(process.env.REFRESH_TOKEN_EXPIRES_IN);

        try {
            await this.refreshTokenRepository.saveByUserId(
                this.signInMapper.toRefreshToken(refreshTokenValue, expirationRefreshTokenTimestamp, user.id)
            );
        } catch (error) {
            throw new Error("Error in AuthenticationService signInUser: " + error);
        }

        return this.signInMapper.toSignInResponse(accessTokenValue, refreshTokenValue);
    }

    public async signUpUser(signUpRequest: SignUpRequest): Promise<void> {
        const passwordHash = await hashPassword(signUpRequest.password);

        let isExistEmail: boolean = true;
        try {
            await this.userRepository.getUserByEmail(signUpRequest.email);
        } catch (error) {
            isExistEmail = false;            
        }

        if (!isExistEmail) {
            try {
                await this.userRepository.save(this.signUpMapper.toUser(signUpRequest.email, passwordHash));
            } catch (error) {
                throw new Error("Error in AuthenticationService signUpUser: " + error);
            }
        }
        else {
            throw new Error("User with the same email exists");
        }
    }

    public async logoutUser(userId: string | undefined, expirationTimestamp: number | undefined): Promise<void> {
        if (userId === undefined) {
            throw Error("Undefined userId when user logout");
        }

        if (expirationTimestamp === undefined) {
            throw Error("Undefined expirationTimestamp when user logout");
        }

        let accessTokenValue: string | null;
        try {
            accessTokenValue = await this.accessTokenRepository.getAccessTokenValueByUserId(userId);
        } catch (error) {
            throw Error("Error in AuthenticationService updateAccessToken: " + error);
        }

        let decodedAccessToken: string | jwt.JwtPayload = "";
        try {
            decodedAccessToken = verifyAccessToken(accessTokenValue);
        } catch (err) {
            throw Error("Access token from database is invalid.")
        }

        if ((decodedAccessToken as jwt.JwtPayload).expirationTimestamp !== expirationTimestamp) {
            throw Error("Access token is invalid");
        }

        try {
            await this.accessTokenRepository.deleteByUserId(userId);
        } catch (error) {
            throw Error("Error in AuthenticationService updateAccessToken: " + error);
        }

        try {
            await this.refreshTokenRepository.deleteByUserId(userId);
        } catch (error) {
            throw Error("Error in AuthenticationService updateAccessToken: " + error);
        }
    }

    public async updateAccessToken(refreshTokenValue: UpdateAccessTokenRequest): Promise<UpdateAccessTokenResponse> {
        let refreshToken: RefreshToken | null;
        let user: User | null;

        try {
            refreshToken = await this.refreshTokenRepository.getRefreshTokenByValue(refreshTokenValue.refreshTokenValue);
        } catch (error) {
            throw Error("Error in AuthenticationService updateAccessToken: " + error);
        }

        try {
            user = await this.userRepository.getUserById(refreshToken.userId);
        } catch (error) {
            throw Error("Error in AuthenticationService updateAccessToken: " + error);
        }

        const currentTimestamp: number = Math.floor(Date.now() / 1000);

        if (currentTimestamp > refreshToken.expirationTimestamp) {
            throw Error("Sign in is required.")
        }

        const expirationAccessTokenTimestamp: number = currentTimestamp + Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
        const accessTokenValue: string = generateAccessTokenValue(user, expirationAccessTokenTimestamp);

        try {
            await this.accessTokenRepository.save(
                this.signInMapper.toAccessToken(user.id, accessTokenValue, expirationAccessTokenTimestamp)
            );
        } catch (error) {
            throw new Error("Error in AuthenticationService signInUser: " + error);
        }

        return this.updateAccessTokenMapper.toUpdateAccessTokenResponse(accessTokenValue);
    }
}
