import express from 'express';
import {registerController , loginController, testController, forgotPasswordController, resetPasswordController} from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authmiddle.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post('/test' , requireSignIn,isAdmin,testController) //test 
router.get('/user-auth' , requireSignIn, (req, res) => {
    res.status(200).send({ok : true})
});

router.get('/admin-auth' , requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok : true})
});
export default router;