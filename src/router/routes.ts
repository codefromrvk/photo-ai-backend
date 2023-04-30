import express from 'express';

import { validateJWT } from '../utils/validateJWT';
import BasicController from '../controllers/BasicController';
import { supabase } from '../supabase';


const router = express.Router();

// TODO: Add routes here
router.post('/test', validateJWT, BasicController.testFunction);

// Get Instagram user access

router.get('/auth', async (req, res) => {
    console.log("req", req.body, req.query)

    const { data, error } = await supabase
        .from('User')
        .insert(
            { name: 'Dan', code: req.query.code }).select()
    console.log({ data, error })


    return res.json({ msg: "Success" })
})


export { router };
