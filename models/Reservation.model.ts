import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
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
    timestamps: true
  }
)

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation