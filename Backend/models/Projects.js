import mongoose from "mongoose";

const ProjectsSchema = mongoose.Schema(
    {
      project_name: {
        type: String,
      },
      description: {
        type: String,
      },
      hours: {
        type: Number,
      },
      assign_to: {
        type: String,
      },
      created_by: {
        type: String
      },
      status: {
        type: String
      },
      files : [
        {
            file: String,
            upload_by: String
        }
    ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('project', ProjectsSchema)

export default Project