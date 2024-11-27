import { TokensDataForCookies } from "../../model/dto/response/signInCookiesResponse";
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

    public toSignInResponse(accessTokenValue: string, refreshTokenValue: string): TokensDataForCookies {
        return {
            accessTokenValue: accessTokenValue,
            refreshTokenValue: refreshTokenValue,
        };
    }
}