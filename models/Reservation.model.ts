const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema(
  {
    "reservationId": String,
    "name": String,
    "email": String,
    "date": String,
    "time": String,
    "tableId": String,
    "status": String,
    "phone": Number
  },
  {
    Timestamps: true
  }
)

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation