const express = require('express')
const {login,register,forgetPass,resetPass,profile,logout} = require('../contrallers/authContraller')

const router = express.Router()


//login
router.post('/login',login)

//register
router.post('/register',register)

//forget password
router.post('/forgetPassword',forgetPass)

//reset password
router.post('/resetPassword',resetPass)

//profile
router.get('/profile',profile)

//logout
router.post('/logout',logout)

module.exports = router
