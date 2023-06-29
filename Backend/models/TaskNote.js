import mongoose from "mongoose";

const taskNoteSchema = mongoose.Schema(
    {
      task_id: {
        type: Object
      },
      task_note: {
        type: String
      },
      added_by: {
        type: String
      }
    },
    {
        timestamps: true,
    }
);

const TaskNotes = mongoose.model('taskNote', taskNoteSchema)

export default TaskNotes