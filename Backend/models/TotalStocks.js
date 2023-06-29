import { mongoose } from 'mongoose'

const TotalSctockSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    assign_quantity: {
      type: Number
    },
    in_working_quantity: {
      type: Number
    },
    not_working_quantity: {
      type: Number
    },
    available_quantity: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
)

const TotalStock = mongoose.model('totalstock', TotalSctockSchema)

export default TotalStock
