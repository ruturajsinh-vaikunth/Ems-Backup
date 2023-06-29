import mongoose from "mongoose";

const ProfileLinksSchema = mongoose.Schema(
    {
        employee_id: {
            type: Number,
            required: true,
          },
        websiteUrl: {
            type: String,
            required: true,
        },
        githubUrl: {
            type: String,
            required: true,
        },
        twitterUrl: {
            type: String,
            required: true,
        },
        instagramUrl: {
            type: String,
            required: true,
        },
        facebookUrl: {
            type: String,
            required: true,
        },
    });

const ProfileLinks = mongoose.model('profilelink', ProfileLinksSchema)

export default ProfileLinks