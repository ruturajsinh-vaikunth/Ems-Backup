import mongoose from "mongoose";

const WeekOffSchema = mongoose.Schema(
    {
      Day: {
        type: String,
      },
      value: {
        type: String,
      },
    });

const Weekoffs = mongoose.model('weekoff', WeekOffSchema)

export default Weekoffs