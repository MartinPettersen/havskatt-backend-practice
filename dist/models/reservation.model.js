"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReservationSchema = new mongoose_1.default.Schema({
    "reservationId": String,
    "name": String,
    "email": String,
    "date": String,
    "time": String,
    "tableId": String,
    "status": String,
    "phone": Number
}, {
    timestamps: true
});
const Reservation = mongoose_1.default.model("Reservation", ReservationSchema);
module.exports = Reservation;
