import { Request, Response } from 'express';
import dotenv from 'dotenv';
const mongoose = require('mongoose');
const express = require('express')
const Message = require('./models/message.model')
const Menu = require('./models/menu.model')
const Reservation = require('./models/reservation.model')
const cors = require('cors');

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {

    console.log('Connected!')

    app.get('/', function (req: Request, res: Response) {
      res.setHeader('Access-Control-Allow-Origin', '*')

      res.send('Hello, you will need a token to access the data from this api')
    })

    app.get('/api/menues', async (req: Request, res: Response) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      if (req.headers.api_token == process.env.API_TOKEN) {

        try {
          const result = await Menu.find()
          
          res.send(result)
        } catch (error) {
          console.log("Error", error)
          res.status(500).json({ message: error })
        }
      } else {
        res.status(500).json({ message: "Something wrong with token" })
      }
    })

    app.get('/api/messages', async (req: Request, res: Response) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      if (req.headers.api_token == process.env.API_TOKEN) {

        try {
          const result = await Message.find()
          res.send(result)
        } catch (error) {
          console.log("Error", error)
          res.status(500).json({ message: error })
        }
      } else {
        res.status(500).json({ message: "Something wrong with token" })
      }
    })

    app.get('/api/reservations', async (req: Request, res: Response) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      const { date } = req.query;

      if (req.headers.api_token == process.env.API_TOKEN) {
        console.log("we got a hit")
        try {
          const result = await Reservation.find({ date: date })
          res.send(result)
        } catch (error) {
          console.log("Error", error)
          res.status(500).json({ message: error })
        }
      } else {
        res.status(500).json({ message: "Something wrong with token" })
      }
    })

    app.post('/api/message', async (req: Request, res: Response) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      if (req.headers.api_token == process.env.API_TOKEN) {
        console.log("we got a hit")

      try {
        const userMessage = await Message.create(req.body)
        const message = new Message(userMessage)
        message.save()
        res.status(200).json(userMessage)
      } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: error })
      }
    } else {
      res.status(500).json({ message: "Something wrong with token" })
    }

    })
    app.post('/api/reservation', async (req: Request, res: Response) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      try {
        const userReservation = await Reservation.create(req.body)
        const reservation = new Reservation(userReservation)
        reservation.save()
        res.status(200).json(userReservation)
      } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: error })
      }
    })

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  });