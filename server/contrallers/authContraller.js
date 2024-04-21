const userModal = require('../modals/user')
const { hashPassword, comparePassword } = require('../utils/bcryptFunc')
const jwt = require('jsonwebtoken')
const login = async(req,res) => {
    try {
        
        const {email,password} = req.body;
    
        if(!email || !password){
            return res.status(400).json({
                status:"failure",
                msg:"Please enter all fields"
            })
        }
        
        const user = await userModal.findOne({email:email})
        if(!user){
            return res.status(400).json({
                status:"failure",
                msg:"user Not found"
            })
        }
        if(!comparePassword(password,user.password)){
           return  res.status(400).json({
                status:"failure",
                msg:"Invalid credentials"
            })
        }
        
        return res.json({
            status:"success",
            user,
            msg:"sign in successful"
        })
    } catch (error) {
       return  res.status(500).json(error)
    }
}


const register = async(req,res) => {
    try {
        
        const {email,userName,password} = req.body
    
        if(!email || !password || !userName){
            return res.status(400).json({
                status:"failure",
                msg:"Please enter all fields"
            })
        }
    
        const user = await userModal.findOne({email:email})
        if(user){
            return res.status(400).json({
                status:"failure",
                msg:"user already exist"
            })
        }
    
        const newPassword = await hashPassword(password)
    
        const newUser = await userModal.create({
            userName,
            email,
            password: newPassword,
        });
    
        return res.json({
            status:"success",
            newUser,
            msg:"sign up successful"
        })
    } catch (error) {
        return  res.status(500).json(error)
    }
}

const forgetPass = (req,res) => {
    res.json("forgetPass")
}

const resetPass = (req,res) => {
    res.json("resetPass")
}

const profile = (req,res) => {
    res.json("profile")
}

const logout = (req,res) => {
    res.json("logout")
}

module.exports = {login,register,forgetPass,resetPass,profile,logout}