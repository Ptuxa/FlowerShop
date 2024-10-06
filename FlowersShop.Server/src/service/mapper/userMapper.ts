import { UserRequest } from "../../model/dto/request/userRequest";
import { UserResponse } from "../../model/dto/response/userResponse";
import { User } from "../../model/entity/user";
import { v4 as uuid } from "uuid";

export class UserMapper {
    public static toUser(userRequest: UserRequest): User {
        return {
            id: uuid(),
            email: userRequest.email,
            password: userRequest.password,
            role: userRequest.role,
        };
    }

    public static toUserResponse(user: User): UserResponse {
        return {
            id: uuid(),
            email: user.email,
            password: user.password,
            role: user.role,
        };
    }

    public static toUserResponseList(categories: User[]): UserResponse[] {
        return categories.map((user) => this.toUserResponse(user));
    }
}
