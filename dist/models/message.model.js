"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    "name": String,
    "email": String,
    "subject": String,
    "message": String
}, {
    timestamps: true
});
const Message = mongoose_1.default.model("Message", MessageSchema);
module.exports = Message;
