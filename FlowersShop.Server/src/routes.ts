import express from 'express';
import UserController from './controllers/UserController';
import CategoryController from './controllers/CategoryController';
import ProductController from './controllers/ProductController';
import TokenController from './controllers/TokenController';

const router = express.Router();

// Пользователи
router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);
router.put('/users/:id', UserController.updateUser);

// Категории
router.post('/categories', CategoryController.createCategory);
router.get('/categories', CategoryController.getCategories);

// Продукты
router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getProducts);

// Токены (Redis)
router.post('/tokens/refresh', TokenController.addRefreshToken);
router.get('/tokens/access/:user_id', TokenController.getAccessToken);

export default router;