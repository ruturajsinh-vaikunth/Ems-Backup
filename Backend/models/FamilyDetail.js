import mongoose from "mongoose";

const FamilyDetailSchema = mongoose.Schema(
    {
      employee_id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
    });

const FamilyDetail = mongoose.model('FamilyDetail', FamilyDetailSchema)

export default FamilyDetail