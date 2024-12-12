import { AccessTokenDataForCookies } from "../../model/dto/response/updateAccessTokenResponse";

export class UpdateAccessTokenMapper {
    public toAccessTokenDataForCookies(accessTokenValue: string, expirationAccessTokenTimestamp: number): AccessTokenDataForCookies {
        return {
            accessTokenValue: accessTokenValue,
            expirationAccessTokenTimestamp: expirationAccessTokenTimestamp
        };
    }
}