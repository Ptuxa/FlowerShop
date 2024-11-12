import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { verifyAccessToken } from '../../service/utils/authenticationFunctions';

dotenv.config();
const HEADER_AUTH_START_NAME: string = "Bearer ";

// TODO: edit middleware for authentiaction
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader === undefined || !authHeader.startsWith(HEADER_AUTH_START_NAME)) {
        return res.status(403).json({ message: "Authentication is required." });
    }

    const accessTokenValue = authHeader.substring(HEADER_AUTH_START_NAME.length);
    let decoded: string | jwt.JwtPayload = "";
    
    let isValidAccessToken = true;
    try {
        decoded = verifyAccessToken(accessTokenValue);  
    } catch (err) {
        isValidAccessToken = false;
        res.status(403).json({ message: 'Недействительный токен' });
    }

    if (isValidAccessToken) {
        (req as any).user = decoded;
        next(); 
    }
};


// // routes/authRoutes.ts
// import express from 'express';
// import { register, login } from '../controllers/authController';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// export default router;




// // routes/protectedRoutes.ts
// import express from 'express';
// import { authenticateJWT } from '../middlewares/authMiddleware';

// const router = express.Router();

// router.get('/protected', authenticateJWT, (req, res) => {
//     res.json({ message: 'Это защищённый маршрут', user: (req as any).user });
// });

// export default router;



// // app.ts
// import express from 'express';
// import authRoutes from './routes/authRoutes';
// import protectedRoutes from './routes/protectedRoutes';

// const app = express();
// app.use(express.json());

// app.use('/auth', authRoutes);
// app.use('/api', protectedRoutes);

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });