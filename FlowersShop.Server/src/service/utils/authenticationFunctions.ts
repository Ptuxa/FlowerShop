import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import dotenv from "dotenv";
import { User } from '../../model/entity/user';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from "uuid";

dotenv.config();

const PEPPER = process.env.PASSWORD_PEPPER || '';
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;


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
    return jwt.sign({ userId: user.id, expirationTimestamp: expirationTimestamp}, process.env.ACESS_TOKEN_SECRET!, { expiresIn: expirationTimestamp});
};

export const generateRefreshTokenValue = (): string => {
    return uuid();
}

export const verifyAccessToken = (accessTokenValue: string): string | jwt.JwtPayload => {
    return jwt.verify(accessTokenValue, process.env.ACESS_TOKEN_SECRET!);
}