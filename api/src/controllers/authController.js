const User = require("../db/Models/userModel");
const error = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config({path:'config.env'})
exports.signup = async (request, response, next) => {
  const { username, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (!username || !email || !password) {
      return next(error(404, "All fields are required."));
    }
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return response.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        user,
      },
    });
  } catch (err) {
    next(error(err.statusCode, err.message));
  }
};

exports.login = async(request , response , next)=>{
  const {email , password} = request.body;
  try {
    const validUser = await User.findOne({email})
    if(!validUser){
      return next(error(404 ,"User not dound."))
    }
    const validPassword = await bcrypt.compare(password , validUser.password)
    if(!validPassword) return next(error(401,'Wrong credentials.'))
    
      const token =  jwt.sign({id:validUser._id},process.env.JWT_SECRET);
      const{password:hashedPassword , ...rest} = validUser._doc
      
       response.cookie('token', token ).status(200).json({success:true,user:rest})
      
    
  
  } catch (err) {
    next(err)
  }
}


exports.google = async(request , response , next)=>{
  try {
      const user = await User.findOne({email:request.body.email})
      if(user){
        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET)
        
        const expiryDate = new Date(Date.now() + 3600000);
        const{password:undefined , ...rest} = user._doc
        response.cookie('token' , token,{
          expires:expiryDate
        }).status(200).json({
          success:true,
          message:"Request Successful.",
          data:{
            user:rest
          }
        })


      }else{
        const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hashedPassword = await bcrypt.hash(generatePassword , 10)
        const newUser = new User({username:request.body.name.split(' ').join('').toLowerCase() + String(Math.floor(Math.random() * 10000)),
                                  email:request.body.email,
                                  password:hashedPassword,
                                  profilePicture:request.body.photo
        })

        await newUser.save()
        const token =  jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        const {password:hashedPassword2 , ...rest} = newUser._doc
        const expiryDate = new Date(Date.now() + 3600000)
        response.cookie('token',token ,{
          expires:expiryDate
        }).status(200).json({
          success:true,
          message:'Request successful.',
          data:{
            user:rest
          }
        })
      } 



    } catch (err) {
    next(err)
  }
}
