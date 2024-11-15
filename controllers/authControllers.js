const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async(req, res) => {
    const {name, email, password} = req.body;

    // Checking for validation
    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }
    try{
        // if user exists 
        const existingUser =await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({   
                success: false,
                msg: "User already exists"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword})
        await user.save();
        res.status(201).json({
            msg: "User registered successfully",
        })

    }
    catch(err){
        res.status(400).json({
            success: false,
            msg: err.message
        })

    }
}

// Controller for login
exports.login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            msg: "Email and password is required"
        })
    }
    try{
        const user = await User.findOne({email})
        if(!user) {
            res.status(400).json({
                success: false,
                msg: "User not found"   
            })
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({userId: user._id}, process.env.secret, {expiresIn: '1h'})
        res.status(200).json({
            success: true,
            msg: "Login successfull",
            data: token
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}