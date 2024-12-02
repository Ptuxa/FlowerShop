import { SignInRequest } from "../../model/dto/request/signInRequest";
import { SignUpRequest } from "../../model/dto/request/signUpRequest";
import { fetchWithTokenRefresh } from "../../utils/serviceUtils";

export class AuthenticationService {
    public static signInUser = async (signInRequest: SignInRequest): Promise<void> => {
        let signInResponse: Response;

        try {
            signInResponse = await fetch(`http://localhost:5000/api/auth/sign-in/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(signInRequest),
                credentials: "include",
            });
        } catch (error) {
            throw new Error(`Sign in user error ${error}`);
        }

        if (signInResponse.status !== 200) {
            throw new Error(`Cannot sign in user`);
        }
    };

    public static signUpUser = async (signUpRequest: SignUpRequest): Promise<void> => {
        let signUpResponse: Response;

        try {
            signUpResponse = await fetch("http://localhost:5000/api/auth/sign-up/", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(signUpRequest),
            });
        } catch (error) {
            throw new Error(`Sign up user error ${error}`);
        }

        if (signUpResponse.status !== 201) {
            throw new Error(`Cannot sign up user`);
        }
    };

    public static logoutUser = async (): Promise<void> => {
        let logoutUserResponse: Response;

        try {
            logoutUserResponse = await fetchWithTokenRefresh("http://localhost:5000/api/auth/logout/", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            throw new Error(`Logout user error ${error}`);
        }

        if (logoutUserResponse.status !== 200) {
            throw new Error(`Cannot logout user`);
        }
    };

    public static updateAccessToken = async (): Promise<void> => {
        let logoutUserResponse: Response;

        try {
            logoutUserResponse = await fetch("http://localhost:5000/api/auth/update-access-token/", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            throw new Error(`Update access token error ${error}`);
        }

        if (logoutUserResponse.status !== 200) {
            throw new Error(`Cannot update access token`);
        }
    };
}
