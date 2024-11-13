import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        authentication?: {
            userId: string;
        };
    }
}
