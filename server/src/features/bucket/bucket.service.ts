import { ListBucketsCommand, CreateBucketCommand, Bucket } from '@aws-sdk/client-s3'
import { ServiceBase } from '../service.base'

export class BucketService extends ServiceBase {
  async fetchBuckets(): Promise<Bucket[]> {
    const response = await this._client.send(new ListBucketsCommand({}))
    return response.Buckets
  }

  async crateBucket(name: string): Promise<Bucket> {
    const response = await this._client.send(
      new CreateBucketCommand({
        Bucket: name,
      })
    )

    if (response) {
      const buckets = await this.fetchBuckets()
      return buckets.find((bucket) => bucket.Name.includes(name))
    }

    return null
  }
}
