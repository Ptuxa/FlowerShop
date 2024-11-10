import { ImageRequest } from "../../model/dto/request/imageRequest";
import { ImageResponse } from "../../model/dto/response/imageResponse";
import { Image } from "../../model/entity/image";
import { v4 as uuid } from "uuid";

export class ImageMapper {
    public toImage(imageRequest: ImageRequest): Image {
        return {            
            id: uuid(), 
            path: imageRequest.path,
        };
    }

    public toImageResponse(image: Image): ImageResponse {
        return {
            id: image.id,
            path: image.path,
        };
    }

    public toImageResponseList(categories: Image[]): ImageResponse[] {
        return categories.map((image) => this.toImageResponse(image));
    }

    public partialUpdate(imageRequest: ImageRequest, image: Image): ImageResponse {
        return {
            id: image.id,
            path: imageRequest.path,
        }
    }
}