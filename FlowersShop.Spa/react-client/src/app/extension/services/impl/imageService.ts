import { SendImageResponse } from "../../model/dto/response/sendImageResponse";
import { fetchWithTokenRefresh } from "../../utils/serviceUtils";
import { ImageMapper } from "../mapper/imageMapper";

export class ImageService {
    public static sendImage = async (file: File): Promise<string> => {
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
                credentials: "include",
            });
        } catch (error) {
            throw new Error(`Send image error ${error}`);
        }

        if (sendImageResponse.status !== 201) {
            throw new Error(`Cannot send image`);
        }

        return ImageMapper.toImageName(await sendImageResponse.json());
    };

    public static deleteImage = async (): Promise<void> => {
        let deleteImageResponse: Response;

        try {
            deleteImageResponse = await fetchWithTokenRefresh("http://localhost:5000/api/image/", {
                method: "DELETE",
                credentials: "include",
            });
        } catch (error) {
            throw new Error(`Delete image error ${error}`);
        }

        if (deleteImageResponse.status !== 204) {
            throw new Error(`Cannot delete image`);
        }
    };

    public static getImageTempUrlByImageName = async (imageName: string): Promise<string> => {
        let getImageTempUrlByImageNameResponse: Response;

        try {
            getImageTempUrlByImageNameResponse = await fetch(`http://localhost:5000/api/image/${imageName}`, {
                method: "GET",
            });
        } catch (error) {
            throw new Error(`Delete image error ${error}`);
        }

        if (getImageTempUrlByImageNameResponse.status !== 200) {
            throw new Error(`Cannot delete image`);
        }

        const blob = await getImageTempUrlByImageNameResponse.blob();
        return URL.createObjectURL(blob); 
    };

    public static getImageServerUrlByImageName = (imageName: string): string => {
        return `http://localhost:5000/api/image/${imageName}`;
    }
}
