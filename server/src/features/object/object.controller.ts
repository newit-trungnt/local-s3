import {
  ListObjectsCommandInput,
  PutObjectCommandInput,
  PutObjectRequest,
} from '@aws-sdk/client-s3'
import { Request, Response, Router } from 'express'
import { Controller } from '../../interface'
import { CreateObjectArgs, GetObjectsArgs } from './object.interface'
import { ObjectService } from './object.service'

export class ObjectController implements Controller {
  path = '/objects'
  router = Router()
  _service: ObjectService

  constructor() {
    this._service = new ObjectService()

    this._initRoutes()
  }

  _initRoutes() {
    this.router.get(this.path, this._getObjects)
    this.router.post(this.path, this._createObject)
  }

  _createObject= async (req: Request, res: Response) => {
    const { body } = req
    // TODO: validate request body
    // check whether given bucket is existing or not
    const data: CreateObjectArgs = {
      bucket: body.bucket,
      name: body.name,
      body: body.body,
    }

    const params: PutObjectCommandInput = {
      Bucket: data.bucket,
      Key: data.name,
      Body: data.body as PutObjectRequest['Body'],
    }

    const result = await this._service.createObject(params)

    // TODO: implement handleResponse method
    if (result) {
      res.send('OK')
    } else {
      res.status(404).send()
    }
  }

  _getObjects = async (req: Request, res: Response) => {
    const { body } = req

    // TODO: validate request body
    const data: GetObjectsArgs = {
      bucket: body.bucket,
    }

    const params: ListObjectsCommandInput = {
      Bucket: data.bucket,
    }

    const result = await this._service.getObjects(params)

    res.json(result.Contents)
  }
}
