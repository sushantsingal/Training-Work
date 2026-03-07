const express = require("express");
const router = express.Router();
const { userService } = require('../services/index.js');


router.post('/login', async (req, res) => {
    try {
        const payload = req.body;
        const result = await userService.loginUser(payload);

        if(result.error){
            return res.status(result.status).json({error: result.error});
        }
        return res.json(result);
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/register', async (req, res) => {
    try {
        const payload = req.body;
        const result = await userService.registerUser(payload);
        if(result.error){
            return res.status(result.status).json({error: result.error});
        }
        return res.status(result.status).json(result);
    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;