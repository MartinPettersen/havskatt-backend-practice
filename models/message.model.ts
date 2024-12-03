const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
    {
        "name": String,
        "email": String,
        "subject": String,
        "message": String
      },
      {
        Timestamps: true
      }
)

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message