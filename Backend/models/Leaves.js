import mongoose from "mongoose";

const LeaveSchema = mongoose.Schema(
    {
        employee_id: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
        },
        leave_type: {
            type: String,
        },
        duration: {
            type: Number,
        },
        status: {
            type: String,
        },
        files : [
            {
                attachment: String,
            }
        ],
        from_date: {
            type: Date,
        },
        to_date: {
            type: Date,
        },
    },
    { timestamps: true },
);

const Leaves = mongoose.model('leave',LeaveSchema);

export default Leaves;