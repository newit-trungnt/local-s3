import { S3Service } from './S3.service'
import {
  ListObjectsCommand,
  ListObjectsCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
} from '@aws-sdk/client-s3'
import type { Readable } from 'stream'

export class S3ObjectService extends S3Service {
  async getAllObjects(params: ListObjectsCommandInput) {
    const command = new ListObjectsCommand(params)
    const data = (await this._instance.send(command)).Contents || []
    return data
  }

  async getObject(params: GetObjectCommandInput) {
    const command = new GetObjectCommand(params)
    const response = await this._instance.send(command)
    console.log(response)
    console.log(response.ContentType)
    // TODO:
    const str = await response.Body.transformToString()
    return []
  }

  async createObject(params: PutObjectCommandInput) {
    const command = new PutObjectCommand(params)
    const response = await this._instance.send(command)
    return response
  }
}
