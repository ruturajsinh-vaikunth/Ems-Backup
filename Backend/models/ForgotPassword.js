import mongoose from "mongoose";

const ForgotPasswordSchema = mongoose.Schema(
    {
      email: {
        type: String,
      },
      reset_link: {
        type: String,
      },
      time: {
        type: Date,
      }
    });

const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema)

export default ForgotPassword