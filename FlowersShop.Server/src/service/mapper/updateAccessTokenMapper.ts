import { UserRequest } from "../../model/dto/request/userRequest";
import { UpdateAccessTokenResponse } from "../../model/dto/response/updateAccessTokenResponse";
import { UserResponse } from "../../model/dto/response/userResponse";
import { User } from "../../model/entity/user";
import { v4 as uuid } from "uuid";

export class UpdateAccessTokenMapper {
    public toUpdateAccessTokenResponse(accessTokenValue: string): UpdateAccessTokenResponse {
        return {
            accessTokenValue: accessTokenValue
        };
    }
}