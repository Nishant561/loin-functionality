const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'config.env'})
exports.verifyToken = async(request, response , next)=>{
    const token = request.cookies.token
    
    if(!token) return response.status(401).json({
        success:false,
        message:"You need to login."
    })

    jwt.verify(token , process.env.JWT_SECRET,(err,user)=>{
        if(err) return response.status(403).json("Token is not valid.")
            request.user = user
            next()
        })



}