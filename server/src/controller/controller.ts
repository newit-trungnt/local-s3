import { Exception } from '@src/exception/Exception'
import { ServiceResponse, ServiceResponseStatus } from 'shared'
import { Response, Router } from 'express'

export class Controller {
  router: Router

  _generateResponse(
    status: ServiceResponseStatus,
    data: unknown,
    error: Exception | null
  ): ServiceResponse {
    if (error === null) {
      return {
        data,
        status
      }
    }

    return {
      error: `${error?.message}`,
      status,
    }
  }

  generateSuccessResponse(data: unknown) {
    return this._generateResponse('success', data, null)
  }

  generateFailureResponse(error: unknown) {
    return this._generateResponse('failure', null, new Exception(`${error}`))
  }

  async handleRequest<T>(fn: () => Promise<T>, res: Response) {
    let response: ServiceResponse
    try {
      const data = await fn()
      response = this.generateSuccessResponse(data)
    } catch (error) {
      response = this.generateFailureResponse(error)
    }
    res.json(response)
  }
}
