import { SendImageResponse } from "../model/dto/response/sendImageResponse";
import { fetchWithTokenRefresh } from "../utils/serviceUtils";

export const sendImage = async (id: string, file: File): Promise<SendImageResponse> => {
    const formData = new FormData();
    formData.append("image", file);
    
    let sendImageResponse: Response;

    try {
        sendImageResponse = await fetchWithTokenRefresh(`http://localhost:5000/api/image/`, {
            method: "POST",
            headers: {
                "content-type": "application/form-data",            
            },
            body: formData,
            credentials: "include"
        });
    } catch(error) {
        throw new Error(`Send image error ${error}`);
    }

    if (sendImageResponse.status !== 201) {
        throw new Error(`Cannot send image`);
    }

    return sendImageResponse.json();
}

export const deleteImage = async (): Promise<void> => {
    let deleteImageResponse: Response;

    try {
        deleteImageResponse = await fetchWithTokenRefresh("http://localhost:5000/api/image/", {
            method: "DELETE",
            credentials: "include"
        });
    } catch(error) {
        throw new Error(`Delete image error ${error}`);
    }

    if (deleteImageResponse.status !== 204) {
        throw new Error(`Cannot delete image`);
    }
}

export const getImageUrlByFileName = async (fileName: string) => {
    let getImageByFileNameResponse: Response;

    try {
        getImageByFileNameResponse = await fetch(`http://localhost:5000/api/image/${fileName}`, {
            method: "GET"
        });
    } catch(error) {
        throw new Error(`Delete image error ${error}`);
    }

    if (getImageByFileNameResponse.status !== 200) {
        throw new Error(`Cannot delete image`);
    }   

    const blob = await getImageByFileNameResponse.blob(); 
    const url = URL.createObjectURL(blob); 

    return url;
}