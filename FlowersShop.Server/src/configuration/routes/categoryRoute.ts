import express from 'express';
import { CategoryService } from '../../service/impl/categoryService';
import { CategoryRepository } from '../../repository/categoryRepository';
import { CategoryMapper } from '../../service/mapper/categoryMapper';
import CategoryController from '../../controller/categoryController';

const router = express.Router();
const categoryService = new CategoryService(new CategoryRepository(), new CategoryMapper());
const categoryController = new CategoryController(categoryService);

router.get('/:id', categoryController.getCategoryById);
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
