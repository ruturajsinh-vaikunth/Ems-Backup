import mongoose from "mongoose";

const EventsSchema = mongoose.Schema(
    {
      title: {
        type: String,
      },
      startdate: {
        type: Date,
      },
      enddate: {
        type: Date,
      },
      description: {
        type: String,
      },
      eventimage: {
        type: String,
      },
      eventgallery : [
        {
            image: String,
        }
    ],
      mode: {
        type: String
      }
    });

const Event = mongoose.model('event', EventsSchema)

export default Event