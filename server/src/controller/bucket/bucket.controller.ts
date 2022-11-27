import { S3BucketService } from '@src/service'
import { Router, Request, Response } from 'express'
import { API_PATH } from 'shared'
import { Controller } from '../controller'


export class BucketController extends Controller {
  path = API_PATH.BUCKET
  router = Router()

  _service: S3BucketService

  constructor() {
    super()
    this._service = new S3BucketService()
    this._initRoutes()
  }

  _initRoutes() {
    this.router.get(this.path, this._getAllBuckets)
    this.router.post(this.path, this._addBucket)
  }

  _getAllBuckets = async (_: Request, res: Response) => {
    const fn = () => this._service.getAllBuckets()
    this.handleRequest(fn, res)
  }

  _addBucket = async (req: Request, res: Response) => {
    const { name } = req.body
    const fn = () => this._service.createBucket(`${name}`)
    this.handleRequest(fn, res)
  }
}
