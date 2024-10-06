import { v4 as uuid } from "uuid";
import { RefreshTokenRequest } from "../../model/dto/request/refreshTokenRequest";
import { RefreshToken } from "../../model/entity/refreshToken";
import { RefreshTokenResponse } from "../../model/dto/response/refreshTokenResponse";

export class RefreshTokenMapper {
    // public static toRefreshToken(refreshTokenRequest: RefreshTokenRequest): RefreshToken {
    //     return {
    //         user_id: uuid(), 
    //         value: refreshTokenRequest.value,

    //         name: refreshTokenRequest.name,            
    //     };
    // }

    // public static toRefreshTokenResponse(refreshToken: RefreshToken): RefreshTokenResponse {
    //     return {
    //         id: refreshToken.id,
    //         name: refreshToken.name,
    //     };
    // }

    // public static toRefreshTokenResponseList(categories: RefreshToken[]): RefreshTokenResponse[] {
    //     return categories.map((refreshToken) => this.toRefreshTokenResponse(refreshToken));
    // }
}