import { LoadImageResponse } from "../../model/dto/response/loadImageResponse";

export class ImageMapper {
    public toLoadImageResponse(fileImage: Express.Multer.File): LoadImageResponse {
        return {
            fileName: fileImage.filename,            
        };
    }
}