const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

//@desc Register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler( async (req, res) => {
    console.log("The request body is :", req.body)

    const { username, email, password } = req.body;
    if(!username || !email ||  !password){
        res.status(400);
        throw new Error('All fields are required');
    }
    const userAvailable = await User.findOne({email})
    if (userAvailable){
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    } else{
        res.status(400);
        throw new Error('User already exists');
    }

    res.status(201).json(username);
})

/// @desc Login User
// @route GET /api/users/login
/// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.JWT_SECRET, {expiresIn: '15m'});
        res.status(200).json({accessToken})
    } else{
        res.status(401);
        throw new Error('email or password is incorrect');
    }
    res.json({message:"login user"})
})

/// @desc Current user info
// @route POST /api/users/current
/// @access private
const currentUser = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.params.id)
    //
    // if(!user){
    //     res.status(404);
    //     throw new Error('Not Found');
    // }
    res.status(200).json(req.user);
})


module.exports = {
    registerUser,
    loginUser,
    currentUser
}