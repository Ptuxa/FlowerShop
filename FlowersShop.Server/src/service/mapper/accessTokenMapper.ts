import { AccessTokenRequest } from "../../model/dto/request/accessTokenRequest";
import { AccessTokenResponse } from "../../model/dto/response/accessTokenResponse";
import { AccessToken } from "../../model/entity/accessToken";
import { v4 as uuid } from "uuid";

export class AccessTokenMapper {
    // public static toAccessToken(accessTokenRequest: AccessTokenRequest): AccessToken {
    //     return {
    //         user_id: uuid(), 
    //         value: accessTokenRequest.value,

    //         name: accessTokenRequest.name,            
    //     };
    // }

    // public static toAccessTokenResponse(accessToken: AccessToken): AccessTokenResponse {
    //     return {
    //         id: accessToken.id,
    //         name: accessToken.name,
    //     };
    // }

    // public static toAccessTokenResponseList(categories: AccessToken[]): AccessTokenResponse[] {
    //     return categories.map((accessToken) => this.toAccessTokenResponse(accessToken));
    // }
}