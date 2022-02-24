const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please provide all fields')
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({name, email, password: hashedPassword})

    if(user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not registered')
    }
  
})

const loginUser = asyncHandler(async(req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
})

const getUser = asyncHandler(async(req, res) => {

    res.status(200).json(req.user)
})

//Gen JWT

const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}


module.exports = {
    registerUser,
    loginUser,
    getUser
}