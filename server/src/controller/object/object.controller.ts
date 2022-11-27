import {
  GetObjectCommandInput,
  ListObjectsCommandInput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'
import { S3ObjectService } from '@src/service/Object.service'
import { Request, Response, Router } from 'express'
import fileUpload from 'express-fileupload'
import { GetAllObjectParams, GetObjectParams, API_PATH } from 'shared'
import { Controller } from '../controller'

export class ObjectController extends Controller {
  path = API_PATH.OBJECT
  router = Router()
  _service: S3ObjectService

  constructor() {
    super()
    this._service = new S3ObjectService()
    this._initRoutes()
  }

  _initRoutes() {
    this.router.get(this.path, this._getObjects)
    this.router.post(this.path, this._createObject)
    this.router.get(this.path + '/:key/:bucket', this._getObject)
  }

  _createObject = async (req: Request, res: Response) => {
    const { body } = req

    const fileContent = req.files?.content as fileUpload.UploadedFile

    // TODO: validate request body
    // check whether given bucket is existing or not
    const data = {
      bucket: body.bucket,
      name: body.name,
      body: fileContent.data,
    }

    const params: PutObjectCommandInput = {
      Bucket: data.bucket,
      Key: data.name,
      Body: data.body,
    }

    const fn = () => this._service.createObject(params)
    this.handleRequest(fn, res)
  }

  _getObjects = async (req: Request<any, any, any, GetAllObjectParams>, res: Response) => {
    const { query } = req
    // TODO: validate request body
    const data = {
      bucket: query.bucket,
    }

    const args: ListObjectsCommandInput = {
      Bucket: data.bucket,
    }
    
    const fn = () => this._service.getAllObjects(args)
    this.handleRequest(fn, res)
  }

  _getObject = async (req: Request<GetObjectParams>, res: Response) => {
    const { params } = req
    const input: GetObjectCommandInput = {
      Bucket: params.bucket,
      Key: params.key,
    }
    const fn = () => this._service.getObject(input)
    this.handleRequest(fn, res)
  }
}
