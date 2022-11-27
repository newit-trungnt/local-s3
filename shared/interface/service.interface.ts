export type ServiceResponseStatus = 'success' | 'failure'

export interface ServiceResponse {
  status: ServiceResponseStatus
  data?: unknown,
  error?: unknown
}
