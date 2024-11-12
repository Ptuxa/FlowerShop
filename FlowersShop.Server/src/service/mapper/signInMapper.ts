import { SignInRequest } from "../../model/dto/request/signInRequest";
import { SignInResponse } from "../../model/dto/response/signInResponse";
import { AccessToken } from "../../model/entity/accessToken";
import { RefreshToken } from "../../model/entity/refreshToken";
import { v4 as uuid } from "uuid";

export class SignInMapper {
    public toAccessToken(userId: string, value: string, expirationTimestamp: number): AccessToken {
        return {
            userId: userId,
            value: value,
            expirationTimestamp: expirationTimestamp
        };
    }

    public toRefreshToken(value: string, expirationTimestamp: number, userId: string): RefreshToken {
        return {
            id: uuid(),
            value: value,
            expirationTimestamp: expirationTimestamp,
            userId: userId
        };
    }

    public toSignInResponse(accessToken: string, refreshToken: string): SignInResponse {
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }
}