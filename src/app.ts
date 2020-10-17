import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    dotenv.config()

    this.middlewares()
    this.database()
    this.routes()
    // this.express.use(this.errorHandling)
  }

  private middlewares () {
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(bodyParser.json())
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database () {
    mongoose.connect(
      process.env.MONGODB_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
  }

  private routes () {
    this.express.use(routes)
  }

  private errorHandling (err: Error, req: Request, res: Response) {
    if (typeof (err) === 'string') {
      return res.status(400).json({ message: err })
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message })
    }

    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Invalid Token' })
    }

    return res.status(500).json({ message: err.message })
  }
}

export default new App().express
