const jwt= require('jsonwebtoken');
const User = require('../Models/User');

const bcrypt = require('bcrypt');
const signup=async (req,res)=>{
    try{
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409)
            .json({ message: 'User already exists, you can login',success: false });  
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
       res.status(201).json({ success: true, message: "Signup Successful" });

    }catch(err){
        return res.status(500)
        .json({ message: 'Internal server error', success: false });


    }   

}
const login=async (req,res)=>{
    try{
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        const errorMsg= 'Authentication Failed email or password is wrong ';

        if (!existingUser) {
            return res.status(403)
            .json({ message: errorMsg,success: false });  
        }

        // Create a new user
       const isPassequal=await bcrypt.compare(password,existingUser.password);
       if(!isPassequal){
           return res.status(403)
           .json({ message: errorMsg,success: false });  
       }
       const jwtToken=jwt.sign(
              { userId: existingUser._id, email: existingUser.email },
              process.env.JWT_SECRET,
              { expiresIn: '24h' }
       )
       res.status(200)
       .json({
        message: 'Login successful',
        success: true,
        jwtToken,
        email,
        name: existingUser.name,
       })


    }catch(err){
        return res.status(500)
        .json({ message: 'Internal server error', success: false });


    }

}
    module.exports = { signup,login};