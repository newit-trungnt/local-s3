import * as express from 'express'

import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as fileUpload from 'express-fileupload'

import { BucketController } from './controller/bucket'
import { ObjectController } from './controller/object'
import { Controller } from './controller'


const controllers: Controller[] = [new BucketController(), new ObjectController()]

export default class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this._initMiddleware()
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
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(morgan('combined'))
    this.app.use(cors())
    this.app.use(fileUpload())
  }

  _initController(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router)
    })
  }
}
