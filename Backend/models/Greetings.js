import { mongoose } from 'mongoose'

const GreetingsSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    sender: {
      type: String,
    },
    receiver: {
        type: String,
    },
    type: {
        type: String,
    },
    greetings: {
        type: String
    }
  },
  {
    timestamps: true,
  }
)

const Greeting = mongoose.model('Greeting', GreetingsSchema)

export default Greeting
