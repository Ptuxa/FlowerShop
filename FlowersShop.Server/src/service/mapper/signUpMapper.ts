import { v4 as uuid } from "uuid";
import { SignUpRequest } from "../../model/dto/request/signUpRequest";
import { User } from "../../model/entity/user";
import { EnumUserRole } from "../../model/enum/enumUserRole";
import { hashPassword } from "../utils/authenticationFunctions";

export class SignUpMapper {
    public toUser(email: string, password: string): User {
        return {            
            id: uuid(), 
            email: email,
            password: password,
            role: EnumUserRole.USER,
        };
    }    
}