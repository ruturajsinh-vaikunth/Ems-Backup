import { mongoose } from 'mongoose'

const AssetRequestSchema = mongoose.Schema(
  {
    employee_id: {
      type: Number,
    },
    asset_type: {
      type: String,
    },
    reason: {
      type: String
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true,
  }
)

const AssetRequest = mongoose.model('AssetRequest', AssetRequestSchema)

export default AssetRequest
