"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MenuSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true
});
const Menu = mongoose_1.default.model("Menu", MenuSchema);
module.exports = Menu;
