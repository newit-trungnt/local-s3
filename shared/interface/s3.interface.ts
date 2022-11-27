export interface IParamObject {
  [key: string]: string | string[] | number | boolean;
}

export interface S3Bucket {
  Name: string
  CreationDate: string
}

export interface S3CreateBucketArgs {
  name: string
}

export interface S3ObjectOwner {
  DisplayName: string
  ID: string
}

export interface S3Object {
  ETag: string
  Key: string
  LastModified: string
  Size: number,
  Owner: S3ObjectOwner
}

export interface S3Region {
  code: string
  displayName: string,
  originalName: string
}

export interface GetAllObjectParams extends IParamObject {
  bucket: S3Bucket['Name']
}

export interface GetObjectParams extends IParamObject {
  bucket: S3Bucket['Name']
  key: S3Object['Key']
}