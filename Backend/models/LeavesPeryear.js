import mongoose from "mongoose";

const LeavesPeryearSchema = mongoose.Schema(
    {
        employee_id: {
            type: Number,
            required: true,
        },
        EarnedLeave: {
            type: Number,
        },
        CasualLeave: {
            type: Number,
        },
        SickLeave: {
            type: Number,
        },
        CompOff: {
            type: Number,
        },
        FloatingLeave: {
            type: Number,
        },
        year: {
            type: Number,
        }
    });

const LeavesPerYear = mongoose.model('leavesperyear', LeavesPeryearSchema)

export default LeavesPerYear