const User = require("../db/Models/userModel");
const error = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");

exports.updateUser = async (request, response, next) => {
  if (request.user.id !== request.params.id)
    return next(error(401, "You can update your account only."));

  try {
    if (request.body.password) {
      request.body.password = bcrypt.hashSync(request.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          username: request.body.username,
          email: request.body.email,
          password: request.body.password,
          profilePicture: request.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    return response.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: rest,
      },
    });
  } catch (err) {
    next(err);
  }
};



exports.deleteUser = async(request , response ,next)=>{
    if (request.user.id !== request.params.id)
        return next(error(401, "You can delete your account only."));

    try {
        await User.findByIdAndDelete(request.params.id)
        return response.status(200).json({
            success:true,
            message:'User deleted successfully'
        })
    } catch (err) {
        next(err)
    }


}

exports.signout = async(request, response)=>{
    response.clearCookie('token').status(200).json({
        success:true,
        message:"signed out successfully."
    })
}