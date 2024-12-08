import { Request, Response } from 'express';
import dotenv from 'dotenv';
const mongoose = require('mongoose');
const express = require('express')
const Message = require('./models/message.model.ts')
const Menu = require('./models/menu.model.ts')
const Reservation = require('./models/reservation.model.ts')

dotenv.config();
const app = express()
app.use(express.json())



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {

    console.log('Connected!')

    app.get('/', function (req: Request, res: Response) {
      res.send('Hello World')
    })

    app.get('/api/menues', async (req: Request, res: Response) => {
      try {
        const result = await Menu.find()
        res.send(result)
      } catch(error) {
        console.log("Error", error)
        res.status(500).json({ message: error })
      }
    })

    app.get('/api/messages', async (req: Request, res: Response) => {
      try {
        const result = await Message.find()
        res.send(result)
      } catch(error) {
        console.log("Error", error)
        res.status(500).json({ message: error })
      }
    })

    app.get('/api/reservations', async (req: Request, res: Response) => {

      const { date } = req.query;  

      console.log("Requested Date:", date); 

      try {
        const result = await Reservation.find({ date: date })
        res.send(result)
      } catch(error) {
        console.log("Error", error)
        res.status(500).json({ message: error })
      }
    })

    app.post('/api/message', async (req: Request, res: Response) => {

      try {
        const userMessage = await Message.create(req.body)
        const message = new Message(userMessage)
        message.save()
        res.status(200).json(userMessage)
      } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: error })
      }

    })
    app.post('/api/reservation', async (req: Request, res: Response) => {
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

    app.listen(3000)
  });