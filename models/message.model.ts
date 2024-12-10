import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        "name": String,
        "email": String,
        "subject": String,
        "message": String
      },
      {
        timestamps: true
      }
)

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message