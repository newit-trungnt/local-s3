import {
  ListBucketsCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  CreateBucketCommandInput,
  DeleteBucketCommandInput,
  Bucket,
} from '@aws-sdk/client-s3'
import { S3Service } from './S3.service'

export class S3BucketService extends S3Service {
  async getAllBuckets() {
    const command = new ListBucketsCommand({})
    const listBuckets = await this._instance.send(command)
    return listBuckets.Buckets
  }

  async createBucket(bucketName: CreateBucketCommandInput['Bucket']): Promise<Bucket> {
    const listBuckets = await this.getAllBuckets()
    const bucket = listBuckets.find((bucket) => bucket.Name === bucketName)
    if (bucket) {
      return bucket
    } else {
      const command = new CreateBucketCommand({ Bucket: bucketName })
      await this._instance.send(command)
      const listBuckets = await this.getAllBuckets()
      const bucket = listBuckets.find((bucket) => bucket.Name === bucketName)
      return bucket
    }
  }

  async deleteBucket(bucketName: DeleteBucketCommandInput['Bucket']) {
    const command = new DeleteBucketCommand({ Bucket: bucketName })
    const response = await this._instance.send(command)
    return response
  }
}
