export interface CreateObjectArgs {
  bucket: string,
  name: string,
  body: unknown
}

export interface GetObjectsArgs {
  bucket: string
}