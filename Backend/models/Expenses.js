import { mongoose } from 'mongoose'

const ExpenseSchema = mongoose.Schema(
  {
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
    date: {
        type : Date,
    },
    addedby :{
       type: String
    }
  },
  {
    timestamps: true,
  }
)

const Expenses = mongoose.model('expenses', ExpenseSchema)

export default Expenses