import { Request, Response } from 'express';
import dotenv from 'dotenv';
const mongoose = require('mongoose');
const express = require('express')
const Message = require('./models/message.model.ts')
//const Menu = require('./models/menu.model.ts')

dotenv.config();
const app = express()
app.use(express.json())



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    
    console.log('Connected!')

    

    
    app.get('/', function (req: Request, res: Response) {
      res.send('Hello World')
    })
    
    app.post('/api/message', async(req: Request,res: Response) => {
      
      
      try {
       
        //const menu = await Menu.create(tempMenu) 
        //menu.save()
        const userMessage = await Message.create(req.body)

        const message = new Message(userMessage)
        message.save()

        res.status(200).json(userMessage)
      } catch (error) {
        console.log("Error",error)
        res.status(500).json({message: error})
      }

    })
    
    app.listen(3000)
  });