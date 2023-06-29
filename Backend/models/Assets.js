import { mongoose } from 'mongoose'

const AssetSchema = mongoose.Schema(
  {
    employee_id: {
      type: Number,
    },
    asset_type: {
      type: String,
    },
    asset_name: {
        type: String,
    },
    asset_number: {
        type: Number
    },
    quantity: {
        type : Number,
    },
    assigned: {
       type: String
    },
    reason: {
      type: String
    },
    condition: {
      type: String
    },
    return_date: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
)

const Asset = mongoose.model('Asset', AssetSchema)

export default Asset
