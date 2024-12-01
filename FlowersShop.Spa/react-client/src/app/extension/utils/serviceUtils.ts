import { updateAccessToken } from "../services/impl/authenticationService";

export const fetchWithTokenRefresh = async (url: string, options: RequestInit): Promise<Response> => {
    let response;
    
    try {
        response = await fetch(url, options);
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }

    if (response.status === 401) {
        try {
            await updateAccessToken();
        } catch(error) {
            console.error("Request failed:", error);
            throw error;
        }
        
        response = await fetch(url, options);

        if (response.status !== 200) {
            throw new Error("Request failed");
        }
    }

    return response;
};