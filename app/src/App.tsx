import React, { useEffect, useState } from 'react'
// import axios from 'axios'

import { API_ENDPOINT, GetAllObjectParams, GetObjectParams, S3Bucket, S3Object } from 'shared'
import { Bucket, Input, Button } from './components'
import { API } from './api'
import { API_PATH } from 'shared'
// const bucket_endpoint = HOST + '/buckets'
// const object_endpoint = HOST + '/objects'

function App() {
  const [buckets, setBuckets] = useState<S3Bucket[]>([])
  const [objects, setObjects] = useState<S3Object[]>([])

  const [newBucketName, setNewBucketName] = useState('')
  const [selectedBucketName, setSelectedBucketName] = useState('')
  const [objectName, setObjectName] = useState('')

  const fetchBuckets = async () => {
    try {
      const buckets = await API.get<S3Bucket[]>(API_PATH.BUCKET, {})
      setBuckets(buckets)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchBuckets()
  }, [])

  const doCreateBucket = async () => {
    await API.post(API_PATH.BUCKET, { name: newBucketName })
    await fetchBuckets()
  }

  const fetchObjects = async (bucketName: string) => {
    try {
      const params: GetAllObjectParams = {
        bucket: bucketName,
      }
      const objects = await API.get<S3Object[]>(API_ENDPOINT.OBJECT.GET_ALL.path, params)
      setObjects(objects)
      setSelectedBucketName(bucketName)
    } catch (error) {
      console.log('error', error)
    }
  }

  const doCreateObject = async () => {
    // await axios.post(object_endpoint, {
    //   bucket: selectedBucketName,
    //   name: objectName,
    //   body: 'test',
    // })
    // await fetchObjects(selectedBucketName)
    // setObjectName('')
  }

  const onChangeObject = (files: FileList) => {
    if (files.length) {
      const file = files[0]
      // setObjectName(file.name)
    } else {
      console.log('Error - no file input')
    }
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-center">S3 GUI</h1>

      <div className="flex flex-row my-3">
        <div className="flex-1 border rounded bg-slate-100 mx-3 p-3">
          <h2 className="text-center my-1">Buckets</h2>
          <label className="block">
            <small>Bucket Name</small>
            <Input onChange={(e) => setNewBucketName(e.target.value)} />
            <Button label="Create" onClick={doCreateBucket} />
          </label>

          {buckets.map((bucket) => (
            <Bucket
              key={bucket.Name}
              bucket={bucket}
              isSelected={selectedBucketName === bucket.Name}
              onSelect={fetchObjects}
            />
          ))}
        </div>

        <div className="flex-1 border rounded bg-slate-100 mx-3 p-3">
          <label className="block">
            <small>Bucket Name</small>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-8"
              value={selectedBucketName}
              disabled
            />
          </label>

          <label className="block">
            <small>Object Name</small>
            <Input type="file" onChange={(e) => onChangeObject(e.target.files)} />
            <Button label="Create" onClick={doCreateObject} />
          </label>

          <div className="border p-1">
            <h2 className="text-center">Objects</h2>
            {objects.map((object) => (
              <Bucket
                key={object.Key}
                bucket={{ Name: object.Key, CreationDate: object.LastModified }}
                isSelected={false}
                onSelect={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
