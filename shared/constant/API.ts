export const API_PATH = {
  BUCKET: '/buckets',
  OBJECT: '/objects',
}

export const ENDPOINT_METHOD = {
  GET: 'get',
  POST: 'post'
}

export const API_ENDPOINT = {
  BUCKET: {
    GET_ALL: {
      method: ENDPOINT_METHOD.GET,
      path: API_PATH.BUCKET
    },
    CREATE: {
      method: ENDPOINT_METHOD.POST,
      path: API_PATH.BUCKET
    }
  },
  OBJECT: {
    GET_ALL: {
      method: ENDPOINT_METHOD.GET,
      path: API_PATH.OBJECT
    },
    CREATE: {
      method: ENDPOINT_METHOD.POST,
      path: API_PATH.OBJECT
    }
  }
}