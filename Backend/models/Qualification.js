import mongoose from "mongoose";

const QualificationSchema = mongoose.Schema(
    {
        employee_id: {
            type: Number,
            required: true,
          },
        degree: {
            type: String,
            required: true,
        },
        institute: {
            type: String,
            required: true,
        },
        from_date: {
            type: Date,
            required: true,
        },
        to_date: {
            type: Date,
            required: true,
        },
        complete_year: {
            type: String,
            required: true,
        },
        gpa_Score: {
            type: String,
            required: true,
        },
    });

const Qualification = mongoose.model('qualification', QualificationSchema)

export default Qualification