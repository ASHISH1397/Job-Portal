import express from 'express'
import { testPostcontroller } from '../controllers/testController.js';
import userAuth from '../middlewares/authMiddleware.js';

//router object
const router=express.Router();


//routes
router.post('/test-post',userAuth, testPostcontroller)

// export
export default router