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
    const FormData = require('form-data');
    let data = new FormData();
    data.append('client_id', '221198347198691');
    data.append('client_secret', '5006486f265c2e9d27a55fcd5a7df09e');
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', 'https://photo-ai-backend.hop.sh/auth');
    data.append('code', req.query.code);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/oauth/access_token',
        headers: { "Content-Type": "multipart/form-data" },
        data: data
    };

    try {
        const resp = await axiosInstance(config)
        const { access_token, user_id } = resp.data

        console.log({access_token,user_id})

        const longLiveData = await axiosInstance.get("https://graph.instagram.com/access_token",{ 
            params:{
            client_secret: "5006486f265c2e9d27a55fcd5a7df09e",
            grant_type: "ig_exchange_token",
            access_token
        }})
        const { access_token: long_lived_access_token, expires_in } = longLiveData.data
        console.log({longLiveData});
        

        const { data, error } = await supabase
            .from('User')
            .insert(
                { name: 'Dan' + Math.random(), access_token: long_lived_access_token,user_id }).select()
        console.log({ data, error });

    } catch (error) {
        console.log({ error });

    }






    return res.json({ msg: "Success" })
})

router.get('/webhook',(req,res)=>{
    console.log("Webhook verification",req.body,req.query)
    res.send(req.query['hub.challenge'])
})
router.post('/webhook',(req,res)=>{
    console.log("Webhook body",req.body,req.query)
    // if(req.query.entry){
        //@ts-ignore
        // console.log("entry",req?.query?.entry[0],req?.query?.entry[0].changes)
        console.log("change",JSON.stringify(req.query));
        
    // }

    res.send({msg:req.body})
})

export { router };
