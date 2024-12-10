import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema(
    {
        "name": String,
        "retter": [
          {
            "navn": String,
            "beskrivelse": String,
            "pris": Number,
            "allergener": { type: [String] },
            "bilde": String
          }
        ]
      },
      {
        timestamps: true
      }
)

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu