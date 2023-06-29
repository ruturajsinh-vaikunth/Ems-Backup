import { mongoose } from 'mongoose'

const TicketConversationSchema = mongoose.Schema(
  {
    ticket_id: {
        type: Object,
    },
    Added_by: {
      type: Number,
    },
    Added_by_type: {
        type: String,
    },
    username: {
        type: String,
    },
    comment:{
        type: String
    }
  },
  {
    timestamps: true,
  }
)

const TicketConversation = mongoose.model('TicketConversation', TicketConversationSchema)

export default TicketConversation
