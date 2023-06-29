import mongoose from "mongoose";

const ProfessionalQualificationSchema = mongoose.Schema(
    {
        employee_id: {
            type: Number,
            required: true,
          },
        company: {
            type: String,
            required: true,
        },
        job_title: {
            type: String,
            unique: true,
        },
        from_date: {
            type: Date,
            required: true,
        },
        to_date: {
            type: Date
        },
    });

const ProfessionalQualification = mongoose.model('professionalqualification', ProfessionalQualificationSchema)

export default ProfessionalQualification