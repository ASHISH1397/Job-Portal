import express from 'express'
import { loginController, registerController } from '../controllers/authController.js';

// router object
const router= express.Router()

//Resister || post
router.post('/register',registerController)

//Login || Post
router.post('/login', loginController)

export default router;