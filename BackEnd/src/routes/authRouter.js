const express = require('express');    
const router = express.Router();        

    const { signup,login } = require('../controllers/authController');
    const { signUpValidation,loginValidation } = require('../Middlewares/authMiddleware');

    router.post('/signup',signUpValidation,signup);
    router.post('/login',loginValidation,login);

    module.exports = router;    