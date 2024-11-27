import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import { User } from "../../model/entity/user";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { TokensDataForCookies } from "../../model/dto/response/signInCookiesResponse";
import { AccessTokenDataForCookies } from "../../model/dto/response/updateAccessTokenResponse";

dotenv.config();

const PEPPER = process.env.PASSWORD_PEPPER || "";
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const COOKIES_FIELD_NAME_ACCESS_TOKEN = "accessTokenValue";
const COOKIES_FIELD_NAME_REFRESH_TOKEN = "refreshTokenValue";

export const AUTH_ROUTE = "/api/auth";
export const UPDATE_ACCESS_TOKEN_ROUTE = "/update-access-token";

const generateSalt = async (rounds: number): Promise<string> => {
    return await bcrypt.genSalt(rounds);
};

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await generateSalt(SALT_ROUNDS);

    return await bcrypt.hash(password + PEPPER, salt);
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password + PEPPER, hash);
};

export const generateAccessTokenValue = (user: User, expirationTimestamp: number): string => {
    return jwt.sign({ userId: user.id, expirationTimestamp: expirationTimestamp }, process.env.ACESS_TOKEN_SECRET!, {
        expiresIn: expirationTimestamp,
    });
};

export const generateRefreshTokenValue = (): string => {
    return uuid();
};

export const verifyAccessToken = (accessTokenValue: string): string | jwt.JwtPayload => {
    return jwt.verify(accessTokenValue, process.env.ACESS_TOKEN_SECRET!);
};

export const setTokensDataInCookiesResponse = (res: Response, tokensDataForCookies: TokensDataForCookies): Response => {
    res.cookie(COOKIES_FIELD_NAME_ACCESS_TOKEN, tokensDataForCookies.accessTokenValue, {
        httpOnly: true,
        secure: false,
        expires: new Date(tokensDataForCookies.expirationAccessTokenTimestamp * 1000),
        sameSite: "strict",
    });

    res.cookie(COOKIES_FIELD_NAME_REFRESH_TOKEN, tokensDataForCookies.refreshTokenValue, {
        httpOnly: true,
        secure: false,
        expires: new Date(tokensDataForCookies.expirationRefreshTokenTimestamp * 1000),
        sameSite: "strict",
        path: AUTH_ROUTE + UPDATE_ACCESS_TOKEN_ROUTE,
    });

    return res;
};

export const clearTokensDataInCookiesResponse = (res: Response): Response => {
    res.clearCookie(COOKIES_FIELD_NAME_ACCESS_TOKEN, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    res.clearCookie(COOKIES_FIELD_NAME_REFRESH_TOKEN, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    return res;
};

export const setAccessTokenDataInCookiesResponse = (
    res: Response,
    accessTokenDataForCookies: AccessTokenDataForCookies
): Response => {
    res.cookie(COOKIES_FIELD_NAME_ACCESS_TOKEN, accessTokenDataForCookies.accessTokenValue, {
        httpOnly: true,
        secure: false,
        expires: new Date(accessTokenDataForCookies.expirationAccessTokenTimestamp * 1000),
        sameSite: "strict",
    });

    return res;
};
