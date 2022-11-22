import { Controller } from '../../interface/controller.interface'
import { Router } from 'express'
import { Request, Response } from 'express'
import { BucketService } from './bucket.service'

export class BucketController implements Controller {
  path = '/buckets'
  router = Router()

  _service: BucketService

  constructor() {
    this._service = new BucketService()
    this._initRoutes()
  }

  _initRoutes() {
    this.router.get(this.path, this._getAllBuckets)
    this.router.post(this.path, this._addBucket)
  }

  _getAllBuckets = async (req: Request, res: Response) => {
    const buckets = await this._service.fetchBuckets()
    res.send(buckets)
  }

  _addBucket = async (req: Request, res: Response) => {
    const { name } = req.query
    res.send(await this._service.crateBucket(`${name}`))
  }
}
