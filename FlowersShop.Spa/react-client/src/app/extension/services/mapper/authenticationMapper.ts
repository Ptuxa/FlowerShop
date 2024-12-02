import { SignInRequest } from "../../model/dto/request/signInRequest";
import { SignUpRequest } from "../../model/dto/request/signUpRequest";
import { SignInFieldsData } from "../../struct/signInFieldsData";
import { SignUpFieldsData } from "../../struct/signUpFieldsData";

export class AuthenticationMapper {
    public static toSignInRequest(signInFieldsData: SignInFieldsData): SignInRequest {
        return {
            email: signInFieldsData.email,
            password: signInFieldsData.password,
        };
    }

    public static toSignUpRequest(signUpFieldsData: SignUpFieldsData): SignUpRequest {
        return {
            email: signUpFieldsData.email,
            password: signUpFieldsData.password,
        };
    }
}
