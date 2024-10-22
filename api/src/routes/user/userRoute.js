const express = require('express')
const { verifyToken } = require('../../utils/verifyUser')
const { updateUser, deleteUser, signout } = require('../../controllers/userController')

const userRouter = express.Router()


userRouter.post("/update/:id" , verifyToken ,updateUser )
userRouter.delete("/delete/:id" , verifyToken ,deleteUser )
userRouter.get("/signout"  ,signout )

module.exports = userRouter