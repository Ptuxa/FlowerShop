import { SendImageResponse } from "@/app/extension/model/dto/response/sendImageResponse";

export class ImageMapper {
    public static toImageName(sendImageResponse: SendImageResponse): string {
        return sendImageResponse.imageName;
    }


    // public static toProduct(productResponse: ): Product {
    //     return {
    //         id: productResponse.id,
    //         name: productResponse.name,
    //         price: productResponse.price,
    //         amount: productResponse.amount,
    //         imageName: productResponse.imageName,
    //         categoryId: productResponse.categoryId
    //     };
    // }

    // public static toProducts(categoryResponse: ProductResponse[]): Product[] {
    //     return categoryResponse.map((category) => this.toProduct(category));
    // }
}