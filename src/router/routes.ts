import express from 'express';

import { validateJWT } from '../utils/validateJWT';
import BasicController from '../controllers/BasicController';
import { supabase } from '../supabase';
import axiosInstance from '../utils/axiosInstance';


const router = express.Router();

// TODO: Add routes here
router.post('/test', validateJWT, BasicController.testFunction);

// Get Instagram user access

router.get('/auth', async (req, res) => {
    console.log("req", req.body, req.query)

    const { data, error } = await supabase
        .from('User')
        .insert(
            { name: 'Dan'+Math.random(), code: req.query.code }).select()
    console.log({ data, error })

    try {
        const {access_token,user_id} = await axiosInstance.post("/oauth/access_token",{
            client_id:"221198347198691",
            client_secret:"5006486f265c2e9d27a55fcd5a7df09e",
            grant_type:"authorization_code",
            redirect_uri:"https://photo-ai-backend.hop.sh",
            code:req.query.code
        })
        console.log({access_token,user_id});
        
        const {access_token:long_lived_access_token,expires_in}= await axiosInstance.post("/oauth/access_token",{
            client_secret:"5006486f265c2e9d27a55fcd5a7df09e",
            grant_type:"ig_exchange_token",
            access_token
        })
        console.log({long_lived_access_token});
        
    } catch (error) {
        
    }






    return res.json({ msg: "Success" })
})


export { router };
