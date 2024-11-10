import { ImageResponse } from "../../model/dto/response/imageResponse";
import { ImageRepository } from "../../repository/imageRepository";
import { ImageMapper } from "../mapper/imageMapper";
import { Image } from "../../model/entity/image";
import { ImageRequest } from "../../model/dto/request/imageRequest";

export class ImageService {
    private imageRepository: ImageRepository;
    private imageMapper: ImageMapper;

    constructor(imageRepository: ImageRepository, imageMapper: ImageMapper) {
        this.imageRepository = imageRepository;
        this.imageMapper = imageMapper;
    }

    public async getImageById(id: string): Promise<ImageResponse> {
        let image: Image | null;

        try {
            image = await this.imageRepository.getImageById(id);
        } catch (error) {
            throw new Error("Error in ImageService getImageById: " + error);
        }

        return this.imageMapper.toImageResponse(image);
    }

    public async getAllImages(): Promise<ImageResponse[]> {
        let images: Image[] | null;

        try {
            images = await this.imageRepository.getAll();
        } catch (error) {
            throw new Error("Error in ImageService getAllCategories: " + error);
        }

        return this.imageMapper.toImageResponseList(images);
    }

    public async createImage(imageRequest: ImageRequest): Promise<ImageResponse> {
        let image: Image | null;

        try {
            image = await this.imageRepository.save(this.imageMapper.toImage(imageRequest));
        } catch (error) {
            throw new Error("Error in ImageService saveImage: " + error);
        }

        return this.imageMapper.toImageResponse(image);
    }

    public async updateImage(id: string, imageRequest: ImageRequest): Promise<ImageResponse> {
        let image: Image | null;

        try {
            image = await this.imageRepository.save(
                this.imageMapper.partialUpdate(imageRequest, await this.imageRepository.getImageById(id))
            );
        } catch (error) {
            throw new Error("Error in ImageService saveImage: " + error);
        }

        return this.imageMapper.toImageResponse(image);
    }

    public async deleteImage(id: string): Promise<void> {
        try {
            await this.imageRepository.deleteById(id);
        } catch (error) {
            throw new Error("Error in ImageService deleteImage: " + error);
        }
    }
}