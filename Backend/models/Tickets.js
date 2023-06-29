import { mongoose } from 'mongoose'

const TicketsSchema = mongoose.Schema(
  {
    employee_id: {
      type: Number,
    },
    category: {
      type: String,
    },
    Assign_to :{
       type: String
    },
    comment:{
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

const Tickets = mongoose.model('Ticket', TicketsSchema)

export default Tickets
