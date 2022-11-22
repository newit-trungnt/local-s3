import { S3Client } from '@aws-sdk/client-s3'

export class ServiceBase {
  _client: S3Client

  constructor() {
    this._client = new S3Client({
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      forcePathStyle: true,

    })
  }
}
