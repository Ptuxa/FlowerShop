import { AccessTokenDataForCookies } from "../../model/dto/response/updateAccessTokenResponse";

export class UpdateAccessTokenMapper {
    public toUpdateAccessTokenResponse(accessTokenValue: string): AccessTokenDataForCookies {
        return {
            accessTokenValue: accessTokenValue
        };
    }
}