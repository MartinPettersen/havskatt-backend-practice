"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = require('mongoose');
const express = require('express');
const Message = require('./models/message.model');
const Menu = require('./models/menu.model');
const Reservation = require('./models/reservation.model');
const cors = require('cors');
dotenv_1.default.config();
const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected!');
    app.get('/', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('Hello, you will need a token to access the data from this api');
    });
    app.get('/api/menues', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.headers.api_token == process.env.API_TOKEN) {
            try {
                const result = yield Menu.find();
                res.send(result);
            }
            catch (error) {
                console.log("Error", error);
                res.status(500).json({ message: error });
            }
        }
        else {
            res.status(500).json({ message: "Something wrong with token" });
        }
    }));
    app.get('/api/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.headers.api_token == process.env.API_TOKEN) {
            try {
                const result = yield Message.find();
                res.send(result);
            }
            catch (error) {
                console.log("Error", error);
                res.status(500).json({ message: error });
            }
        }
        else {
            res.status(500).json({ message: "Something wrong with token" });
        }
    }));
    app.get('/api/reservations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { date } = req.query;
        if (req.headers.api_token == process.env.API_TOKEN) {
            console.log("we got a hit");
            try {
                const result = yield Reservation.find({ date: date });
                res.send(result);
            }
            catch (error) {
                console.log("Error", error);
                res.status(500).json({ message: error });
            }
        }
        else {
            res.status(500).json({ message: "Something wrong with token" });
        }
    }));
    app.post('/api/message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try {
            const userMessage = yield Message.create(req.body);
            const message = new Message(userMessage);
            message.save();
            res.status(200).json(userMessage);
        }
        catch (error) {
            console.log("Error", error);
            res.status(500).json({ message: error });
        }
    }));
    app.post('/api/reservation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try {
            const userReservation = yield Reservation.create(req.body);
            const reservation = new Reservation(userReservation);
            reservation.save();
            res.status(200).json(userReservation);
        }
        catch (error) {
            console.log("Error", error);
            res.status(500).json({ message: error });
        }
    }));
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
