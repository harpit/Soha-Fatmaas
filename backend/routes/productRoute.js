import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authmiddle.js'
import { CategoryWiseProductController, createProductController, deleteProductController, getProductsController, productCountController, productFilterController, productListController, ProductPhotoController, productSearchController, SimilarProductController, singleProductController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product' ,requireSignIn ,isAdmin ,formidable(), createProductController);
router.put('/update-product/:pid' ,requireSignIn ,isAdmin ,formidable(), updateProductController);
router.get('/get-product' , getProductsController);
router.get('/single-product/:slug' ,  singleProductController);
router.get('/photo-product/:pid' ,  ProductPhotoController);
router.delete('/delete-product/:pid' , deleteProductController);
router.post('/product-filters' , productFilterController);
router.get('/product-count' , productCountController);
router.get('/product-list/:page' , productListController);
router.get('/product-search/:keyword', productSearchController);
router.get('/related-product/:pid/:cid', SimilarProductController);
router.get('/product-category/:slug', CategoryWiseProductController);

export default router;