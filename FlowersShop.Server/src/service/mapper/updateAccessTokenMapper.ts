import { UpdateAccessTokenResponse } from "../../model/dto/response/updateAccessTokenResponse";

export class UpdateAccessTokenMapper {
    public toUpdateAccessTokenResponse(accessTokenValue: string): UpdateAccessTokenResponse {
        return {
            accessTokenValue: accessTokenValue
        };
    }
}