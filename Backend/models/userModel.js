import bcrypt from 'bcryptjs'
import { mongoose } from 'mongoose'

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
      required: true,
    },
    employee_id: {
      type: Number
    },
    status: {
      type: String
    },
    profileimg: {
      type: String
    },
  },
  {
    timestamps: true,
  }
)

// hash user's password with salt before saving document to db
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// extend matchPassword function unto userSchema
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
