import express, { Request, Response } from "express";
import CategoryController from "./controller/categoryController";
import ProductController from "./controller/productController";
import ImageController from "./controller/imageController";
import { CategoryMapper } from "./service/mapper/categoryMapper";
import { ProductMapper } from "./service/mapper/productMapper";
import { ImageMapper } from "./service/mapper/imageMapper";
import { CategoryRepository } from "./repository/categoryRepository";
import { ProductRepository } from "./repository/productRepository";
import { ImageRepository } from "./repository/imageRepository";
import { ImageService } from "./service/impl/imageService";
import { CategoryService } from "./service/impl/categoryService";
import { ProductService } from "./service/impl/productService";
import CategoryRouter from "./configuration/routes/categoryRoute";
import ProductRouter from "./configuration/routes/productRoute";
import ImageRouter from "./configuration/routes/imageRoute";
import AuthenticationRouter from "./configuration/routes/authenticationRoute";
import AuthenticationController from "./controller/authenticationController";
import { AuthenticationService } from "./service/impl/authenticationService";
import { AccessTokenRepository } from "./repository/accessTokenRepository";
import { RefreshTokenRepository } from "./repository/refreshTokenRepository";
import { UserRepository } from "./repository/userRepository";
import { SignInMapper } from "./service/mapper/signInMapper";
import { SignUpMapper } from "./service/mapper/signUpMapper";
import { AuthMiddleware } from "./configuration/middleware/authMiddleware";
import { UpdateAccessTokenMapper } from "./service/mapper/updateAccessTokenMapper";

declare global {
    namespace Express {
        interface Request {
            authentication?: {
                userId: string;
                expirationTimestamp: number
            };
        }
    }
}

const PORT = process.env.PORT || 5000;

const categoryMapper = new CategoryMapper();
const productMapper = new ProductMapper();
const imageMapper = new ImageMapper();
const signInMapper = new SignInMapper();
const signUpMapper = new SignUpMapper();
const updateAccessTokenMapper = new UpdateAccessTokenMapper();

const categoryRepository = new CategoryRepository();
const productRepository = new ProductRepository();
const imageRepository = new ImageRepository();
const userRepository = new UserRepository();
const accessTokenRepository = new AccessTokenRepository();
const refreshTokenRepository = new RefreshTokenRepository();

const categoryService = new CategoryService(categoryRepository, productRepository, categoryMapper);
const productService = new ProductService(productRepository, productMapper);
const imageService = new ImageService(imageRepository, productRepository, imageMapper);
const authenticationService = new AuthenticationService(userRepository, accessTokenRepository, refreshTokenRepository, signInMapper, signUpMapper, updateAccessTokenMapper);

const categoryController = new CategoryController(categoryService);
const productController = new ProductController(productService);
const imageController = new ImageController(imageService);
const authenticationController = new AuthenticationController(authenticationService);

const authMiddleware = new AuthMiddleware(userRepository, accessTokenRepository, refreshTokenRepository);

const categoryRouter = new CategoryRouter(categoryController, authMiddleware);
const productRouter = new ProductRouter(productController, authMiddleware);
const imageRouter = new ImageRouter(imageController, authMiddleware);
const authenticationRouter = new AuthenticationRouter(authenticationController, authMiddleware);

const app = express();
app.use(express.json());
app.use('/api/category', categoryRouter.initRoutes());
app.use('/api/product', productRouter.initRoutes());
app.use('/api/image', imageRouter.initRoutes());
app.use('/api/auth', authenticationRouter.initRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// TODO Add routes for authentication

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// mongoose.connect("mongodb://localhost:27017/flower_shop");

// const productSchema = new mongoose.Schema({
//     id: { type: String, default: uuid },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     amount: { type: Number, required: true },
//     pictureName: { type: String, ref: "pictures" },
//     pictureContent: {type}
// });

// const pictureSchema = new mongoose.Schema({
//     id: { type: String, default: uuid },
//     name: { type: String, required: true },
//     content: { type: Buffer, required: true },
// });

// const ProductModel = mongoose.model("products", productSchema);
// const PictureModel = mongoose.model("pictures", pictureSchema);



// // Запуск функции каждые 5 минут
// setInterval(removeUnlinkedPictures, 5 * 60 * 1000); // 5 минут = 5 * 60 * 1000 миллисекунд

// async function removeUnlinkedPictures() {
//     try {
//         console.log("Запуск функции удаления несвязанных изображений");

//         // Шаги для удаления несвязанных изображений
//         const products = await ProductModel.find({}, { pictureId: 1 });
//         const usedPictureIds = products.map((product) => product.pictureId);

//         const result = await PictureModel.deleteMany({
//             id: { $nin: usedPictureIds },
//         });

//         console.log(`Удалено записей: ${result.deletedCount}`);
//     } catch (error) {
//         console.error("Ошибка при удалении несвязанных изображений:", error);
//     }
// }

// //Get products
// app.get("/api/products", async (request: Request, response: Response) => {
//     const products = await ProductModel.find().populate("picture_id");
//     response.status(200).json(products);
// });

// //Get products by id
// app.get("/api/products/:id", async (request: Request, response: Response) => {
//     try {
//         const product = await ProductModel.findById(request.params.id).populate("picture_id");

//         if (!product) {
//             response.status(400).send("product was not found");
//         } else {
//             response.status(200).json(product);
//         }
//     } catch (error) {
//         console.log("Error: cannot get product");
//         response.status(500).send("Server error");
//     }
// });

// //Update product
// app.put("/api/product/:id", async (request: Request, response: Response) => {
//     try {
//         const newPicture = new PictureModel({
//             id: request.body.pictureId,
//             name: request.body.pictureName,
//             content: request.body.pictureContent,
//         });

//         const newProduct = new ProductModel({
//             id: request.params.id,
//             name: request.body.productName,
//             amount: request.body.productAmount,
//             price: request.body.productPrice,
//             picture_id: request.body.pictureId,
//         });

//         const updatedPicture = await ProductModel.findByIdAndUpdate(request.params.id);
//         const updatedProduct = await ProductModel.findByIdAndUpdate(request.params.id);

//         response.status(200).json();
//     } catch (error) {
//         console.error("Error updating product:", error);
//         response.status(500).send("Server error");
//     }
// });

// //Create product
// app.post("/api/products", upload.single("image"), async (request: Request, response: Response) => {
//     try {
//         if (!request.file) {
//             response.status(400).send("No file uploaded");
//         } else {
//             const newPicture = new PictureModel({
//                 id: uuid(),
//                 name: request.file.originalname,
//                 content: request.file.buffer,
//             });

//             await newPicture.save();

//             const newProduct = new ProductModel({
//                 id: uuid(),
//                 name: request.body.name,
//                 price: request.body.price,
//                 amount: request.body.amount,
//                 picture_id: newPicture.id,
//             });

//             await newProduct.save();

//             response.status(201).json(newProduct);
//         }
//     } catch (error) {
//         console.error("Error saving product and image:", error);
//         response.status(500).send("Server error");
//     }
// });

// //Delete product
// app.delete("/api/product/:id", async (request: Request, response: Response) => {
//     try {
//         const deletedProduct = await ProductModel.findByIdAndDelete(request.params.id);

//         if (!deletedProduct) {
//             response.status(400).send("product is not found");
//         } else {
//             response.status(204).send("product has been deleted");
//         }
//     } catch (error) {
//         console.error("Delete product error:", error);
//         response.status(500).send("Server error");
//     }
// });
