const mongoose = require('mongoose')
const dotenv = require ("dotenv")
dotenv.config({path:'config.env'})


const connectDatabase = async ()=>{
    await mongoose.connect(process.env.MONGO)
}

module.exports = connectDatabase