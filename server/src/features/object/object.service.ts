import { ListObjectsCommand, ListObjectsCommandInput, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { ServiceBase } from '../service.base';

export class ObjectService extends ServiceBase {
  async createObject(params: PutObjectCommandInput) {
    const response = await this._client.send(new PutObjectCommand(params));
    return response
  }

  async getObjects(params: ListObjectsCommandInput) {
    const response = await this._client.send(new ListObjectsCommand(params));
    return response
  }
}