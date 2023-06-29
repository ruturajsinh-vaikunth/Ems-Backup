import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Tokens from '../utils/generateToken.js';
import Joi from 'joi';

const registerUser = asyncHandler(async (req, res) => {
  function validateUser(user)
  {
      const JoiSchema = Joi.object({
        firstName: Joi.string()
                  .min(1)
                  .max(50)
                  .required(),
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .required(),
        password: Joi.string()
                .min(4)
                .required(),
        account_type: Joi.string()
                .valid('Employee')
                .valid('Manager'),
      }).options({ abortEarly: false });
  
      return JoiSchema.validate(user)
  }
  const result = validateUser(req.body)
    if(result.error)
    {  
      res.status(400).json({details :result.error.details})
    }
    else{
        const { firstName, email, password, account_type } = req.body

        User.count(function(err,data){
          if(data === 0){
            const userExists = User.findOne({ email })
            if (userExists) {
              res.status(404)
              throw new Error('User already exists')
            }

            let number = '1000'
            let full_number = '' + number + '1';

            const employee_id = Number(full_number);
            let status = "Active"
            // create new user document in db
            const user = User.create({ firstName, email, password, account_type, employee_id, status})

              if (user) {
                res.status(201).json({
                  _id: user._id,
                  firstName: user.firstName,
                  email: user.email,
                  account_type: user.account_type,
                  employee_id: user.employee_id,
                  status: user.status
                })
              } else {
                res.status(400)
                throw new Error('Invalid user data')
              }
            }
          else{
            User.findOne({ email }, function(err, data){
              if(!data){
                  User.findOne({}, {}, {sort : {$natural:-1}, limit : 1}, function(err, data) {

                  let employee_id = data.employee_id + 1;

                  let status = "Active"

                  const user = User.create({ firstName, email, password, account_type, employee_id, status })

                  if (user) {
                    res.status(201).json({
                      _id: user._id,
                      firstName: user.firstName,
                      email: user.email,
                      account_type: user.account_type,
                      employee_id: user.employee_id,
                      status: user.status
                    })
                  } else {
                    res.status(400)
                    throw new Error('Invalid user data')
                  }
                })
              }
              else{
                res.status(400).json({msg : 'User Already Exist.'})
              }
            })
          }
        })
        
    }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // check if user email exists in db
  const user = await User.findOne({ email })
  // return user obj if their password matches
  if (user && (await user.matchPassword(password)) && user.status === "Active") {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      account_type: user.account_type,
      employee_id: user.employee_id,
      status: user.status,
      userToken: Tokens.generateToken(user._id),
    })
    
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const refreshToken = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id : req.body._id})
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      account_type: user.account_type,
      employee_id: user.employee_id,
      userToken: Tokens.generateToken(user._id),
    })
    
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }


})

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      account_type: user.account_type,
      employee_id: user.employee_id,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { registerUser, loginUser, getUserProfile, refreshToken }
