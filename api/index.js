const express = require('express')
const authRouter = require('./src/routes/auth/authRouter')
const cookieParser = require('cookie-parser')
const userRouter = require('./src/routes/user/userRoute')

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/api' ,userRouter)
app.use('/api' , authRouter)


app.use((error,request , response , next)=>{
    return response.status(error.statusCode).json({
        success:false,
        statusCode:error.statusCode,
        message:error.message
    })
})


module.exports = app