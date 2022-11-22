import * as express from 'express'

import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import { Controller } from './interface'

export default class App {
  public app: express.Application

  constructor(controllers: Array<Controller>) {
    this.app = express()
    /**
     * - connect to DB
     * - initialize middleware
     * - initialize controller
     * - initialize error handler
     */

    console.log('Initialize middleware')
    this._initMiddleware()
    console.log('Initialize controllers')
    this._initController(controllers)
  }

  listen() {
    const port = process.env.PORT || 3000
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`)
    })
  }
  _initMiddleware() {
    this.app.use(bodyParser.json())
    this.app.use(morgan('combined'))
  }

  _initController(controllers: Array<Controller>) {
    console.log("🚀 ~ file: app.ts ~ line 38 ~ App ~ _initController ~ controllers", controllers)
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router)
    })
   
  }

  _initErrorHandler() {}
}
