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
} from "../utils/authenticationFunctions";
import { RefreshToken} from "../../model/entity/refreshToken"

export class AuthenticationService {
    private readonly userRepository: UserRepository;
    private readonly accessTokenRepository: AccessTokenRepository;
    private readonly refreshTokenRepository: RefreshTokenRepository;
    private readonly signInMapper: SignInMapper;
    private readonly signUpMapper: SignUpMapper;

    constructor(
        userRepository: UserRepository,
        accessTokenRepository: AccessTokenRepository,
        refreshTokenRepository: RefreshTokenRepository,
        signInMapper: SignInMapper,
        signUpMapper: SignUpMapper
    ) {
        this.userRepository = userRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.signInMapper = signInMapper;
        this.signUpMapper = signUpMapper;
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
            await this.refreshTokenRepository.save(
                this.signInMapper.toRefreshToken(refreshTokenValue, expirationRefreshTokenTimestamp, user.id)
            );
        } catch (error) {
            throw new Error("Error in AuthenticationService signInUser: " + error);
        }

        return this.signInMapper.toSignInResponse(accessTokenValue, refreshTokenValue);
    }

    public async signUpUser(signUpRequest: SignUpRequest): Promise<void> {
        const passwordHash = await hashPassword(signUpRequest.password);

        let isExistEmail: boolean = false;
        try {
            await this.userRepository.getUserByEmail(signUpRequest.email);
        } catch (error) {
            isExistEmail = true;
        }

        if (!isExistEmail) {
            try {
                await this.userRepository.save(this.signUpMapper.toUser(signUpRequest.email, passwordHash));
            } catch (error) {
                throw new Error("Error in AuthenticationService signUpUser: " + error);
            }
        }
    }

    public async logoutUser(userId: string): Promise<void> {
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

    public async updateAccessToken(refreshTokenValue: string): Promise<string> {
        let refreshToken: RefreshToken | null;
        let user: User | null;

        try {
            refreshToken = await this.refreshTokenRepository.getRefreshTokenByValue(refreshTokenValue);
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

        return accessTokenValue;
    }
}
