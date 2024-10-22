const mongoose = require('mongoose')




const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true ,'Username is required'],
        trim:true,
        unique:true
    },
    
    email:{
        type:String,
        required:[true ,'Email is required'],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true , "Password is required."],
        trim:true
    },
    profilePicture:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
    
},{
    timestamps:true,
})


const User = mongoose.model('users' , UserSchema)

module.exports = User
