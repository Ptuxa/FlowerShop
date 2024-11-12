import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import dotenv from "dotenv";
import { User } from '../../model/entity/user';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from "uuid";

dotenv.config();



const generateSalt = (length: number): string => {
    return randomBytes(length).toString('hex');
};

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, process.env.PASSWORD_PEPPER + generateSalt(Number(process.env.SALT_GENERATE_LENGTH)));
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export const generateAccessTokenValue = (user: User, expirationTimestamp: number): string => {
    return jwt.sign({ email: user.email }, process.env.ACESS_TOKEN_SECRET!, { expiresIn: expirationTimestamp});
};

export const generateRefreshTokenValue = (): string => {
    return uuid();
}

export const verifyAccessToken = (accessTokenValue: string): string | jwt.JwtPayload => {
    return jwt.verify(accessTokenValue, process.env.ACESS_TOKEN_SECRET!);
}