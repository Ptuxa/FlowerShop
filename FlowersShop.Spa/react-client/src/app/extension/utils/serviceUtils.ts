import { AuthenticationService } from "../services/impl/authenticationService";
import imageCompression from "browser-image-compression";

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
            await AuthenticationService.updateAccessToken();
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


export const compressImage = async (file: File): Promise<File> => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 64,
        useWebWorker: true,
    };

    let compressedFile: File;

    try {
        compressedFile = await imageCompression(file, options);
    } catch (error) {
        throw error;
    }

    return compressedFile;
};