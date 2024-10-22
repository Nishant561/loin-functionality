const express = require('express')

const authRouter = express.Router()
const authController = require('./../../controllers/authController')
authRouter.post('/user/signup', authController.signup)
authRouter.post('/user/login', authController.login)
authRouter.post('/auth/google' , authController.google)

module.exports = authRouter