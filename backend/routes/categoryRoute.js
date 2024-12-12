import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authmiddle.js'
import { allCategoryController, createCategoryController, singleCategoryController, updateCategoryController ,deleteCategoryController} from '../controller/categoryController.js';

const router = express.Router();

router.post('/create-category' ,requireSignIn ,isAdmin , createCategoryController);
router.put('/update-category/:id' ,requireSignIn ,isAdmin , updateCategoryController);
router.get('/get-category' , allCategoryController);
router.get('/single-category/:slug' , singleCategoryController);
router.delete('/delete-category/:id' ,requireSignIn ,isAdmin , deleteCategoryController);

export default router;