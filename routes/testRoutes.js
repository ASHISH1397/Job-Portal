import express from 'express'
import { testPostcontroller } from '../controllers/testController.js';

//router object
const router=express.Router();


//routes
router.post('/test-post', testPostcontroller)

// export
export default router