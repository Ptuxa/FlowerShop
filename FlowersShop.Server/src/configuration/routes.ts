import express from 'express';
import userRoute from './routes/userRoute';
import categoryRoute from './routes/categoryRoute';
import productRoute from './routes/productRoute';

const router = express.Router();

// router.use(userRoute);
router.use('/category', categoryRoute);
// router.use(productRoute);

export default router;