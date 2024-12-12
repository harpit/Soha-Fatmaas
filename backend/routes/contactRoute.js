import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authmiddle.js'
import { contactController, getContactController } from '../controller/contactController.js';
const router = express.Router();

router.post('/contact-us', contactController);
router.get('/get-contact' ,isAdmin, getContactController);

export default router;