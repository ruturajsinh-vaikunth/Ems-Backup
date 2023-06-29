import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema(
    {
      firstname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
      },
      employee_id: {
        type: Number,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      birth_date: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      nationality : {
        type: String,
        required: true,
      },
      marital_status: {
        type: String,
        required: true,
      },
      date_of_anniversary: {
        type: Date,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
      employee_status: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
      account_type: {
        type: String,
        required: true,
      },
      profileimg: {
        type: String
      },
    });

const Employee = mongoose.model('employee', EmployeeSchema)

export default Employee