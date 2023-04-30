import express from 'express';

import { validateJWT } from '../utils/validateJWT';
import BasicController from '../controllers/BasicController';

const router = express.Router();

// TODO: Add routes here
router.post('/test', validateJWT, BasicController.testFunction);
router.get('/auth',(req,res)=>{
    console.log("req",req.body)
    return res.json({msg:"Success"})
})

export { router };
