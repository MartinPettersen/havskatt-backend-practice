const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema(
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
        Timestamps: true
      }
)

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu