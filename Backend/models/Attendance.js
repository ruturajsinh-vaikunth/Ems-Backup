import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema(
    {
      in_time: {
        type: String,
        require: true,
      },
      type: {
        type: String,
      },
      date: {
        type: Date,
      },
      employee_id: {
        type: Number,
      },
      firstname: {
        type: String,
      },
      status: {
        type: String,
      },
      out_time: {
        type: String,
        require: true,
      },
      breakStartTime: {
        type: String,
        require: true,
      },
      breakEndTime: {
        type: String,
        require: true,
      },
      workHours: {
        type: String,
        require: true,
      },
      duration: {
        type: String,
        require: true,
      },
      comment: {
        type: String,
      },
      statusChangeby: {
        type: String,
      },
      reason: {
        type: String,
        require: false
      }
    },
    { timestamps: true },
    );

const Attendance = mongoose.model('attendance', AttendanceSchema)

export default Attendance