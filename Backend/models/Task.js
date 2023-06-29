import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
      task_name: {
        type: String
      },
      description: {
        type: String
      },
      task_hours: {
        type: Number
      },
      task_note: {
        type: String
      },
      due_date: {
        type: Date
      },
      assign_by: {
        type: String
      },
      assign_to: {
        type: String
      },
      update_by:{
        type: String
      },
      project_id: {
        type: Object
      },
      status: {
        type: String
      },
      files : [
        {
            file: String,
            upload_by: String
        }
      ]
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model('task', taskSchema)

export default Task