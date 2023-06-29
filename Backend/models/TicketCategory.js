import { mongoose } from 'mongoose'

const TicketCategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      unique: true
    },
  },
)

const TicketCategory = mongoose.model('TicketCategories', TicketCategorySchema)

export default TicketCategory
