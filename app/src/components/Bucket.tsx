import React from 'react'
import { S3Bucket } from 'shared'

export type BucketProps = {
  bucket: S3Bucket
  isSelected: boolean
  onSelect: (param: string) => void
}

const Bucket = ({ bucket, isSelected, onSelect }: BucketProps) => {
  return (
    <div
      key={bucket.Name}
      className={`p-2 m-2 border rounded cursor-pointer flex-row flex items-center justify-between hover:shadow ${
        isSelected ? 'bg-slate-500' : 'bg-white'
      }`}
      onClick={() => onSelect(bucket.Name)}
    >
      <p className="text-lg my-1">{bucket.Name}</p>
      <p className="text-xs text-end text-gray-600">{bucket.CreationDate}</p>
    </div>
  )
}

export default Bucket
