import mongoose from "mongoose";

const HolidaysSchema = mongoose.Schema(
    {
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
      holidayTitle: {
        type: String,
      },
      allDay: {
        type : Boolean,
      },
      floating: {
        type: Boolean,
      },
      Image: {
        type: String
      },
    });

const Holiday = mongoose.model('holiday', HolidaysSchema)

export default Holiday