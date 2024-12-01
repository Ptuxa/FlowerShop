import express from "express";
import CategoryController from "./controller/categoryController";
import ProductController from "./controller/productController";
import ImageController from "./controller/imageController";
import { CategoryMapper } from "./service/mapper/categoryMapper";
import { ProductMapper } from "./service/mapper/productMapper";
import { ImageMapper } from "./service/mapper/imageMapper";
import { CategoryRepository } from "./repository/categoryRepository";
import { ProductRepository } from "./repository/productRepository";
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
import { ImageMiddleware } from "./configuration/middleware/imageMiddleware";
import path from "path";
import { AUTH_ROUTE } from "./service/utils/authenticationFunctions";
import cors from "cors";

declare global {
    namespace Express {
        interface Request {
            authentication?: {
                userId: string;
            };
        }
    }
}

const PORT = process.env.PORT || 5000;

const IMAGES_PATH = path.join(__dirname, "../uploads/images");

const ALLOWED_ORIGINS = ["http://localhost:3000"];

const categoryMapper = new CategoryMapper();
const productMapper = new ProductMapper();
const imageMapper = new ImageMapper();
const signInMapper = new SignInMapper();
const signUpMapper = new SignUpMapper();
const updateAccessTokenMapper = new UpdateAccessTokenMapper();

const categoryRepository = new CategoryRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();
const accessTokenRepository = new AccessTokenRepository();
const refreshTokenRepository = new RefreshTokenRepository();

const categoryService = new CategoryService(categoryRepository, productRepository, categoryMapper);
const productService = new ProductService(productRepository, productMapper);
const imageService = new ImageService(imageMapper, IMAGES_PATH);
const authenticationService = new AuthenticationService(
    userRepository,
    accessTokenRepository,
    refreshTokenRepository,
    signInMapper,
    signUpMapper,
    updateAccessTokenMapper
);

const categoryController = new CategoryController(categoryService);
const productController = new ProductController(productService);
const imageController = new ImageController(imageService);
const authenticationController = new AuthenticationController(authenticationService);

const authMiddleware = new AuthMiddleware(userRepository, accessTokenRepository, refreshTokenRepository);
const imageMiddleware = new ImageMiddleware(IMAGES_PATH);

const categoryRouter = new CategoryRouter(categoryController, authMiddleware);
const productRouter = new ProductRouter(productController, authMiddleware);
const imageRouter = new ImageRouter(imageController, authMiddleware, imageMiddleware);
const authenticationRouter = new AuthenticationRouter(authenticationController, authMiddleware);

const app = express();
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        console.log("Origin:", origin);
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use("/api/category", categoryRouter.initRoutes());
app.use("/api/product", productRouter.initRoutes());
app.use("/api/image", imageRouter.initRoutes(), imageMiddleware.errorProcessing);
app.use(AUTH_ROUTE, authenticationRouter.initRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
