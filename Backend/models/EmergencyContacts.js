import mongoose from "mongoose";

const EmergencyContactsSchema = mongoose.Schema(
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
      contact: {
        type: Number,
        require: true,
      }
    });

const EmergencyContacts = mongoose.model('EmergencyContacts', EmergencyContactsSchema)

export default EmergencyContacts