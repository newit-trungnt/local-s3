import { Router } from 'express'

export interface Controller {
  path: string
  router: Router
  _initRoutes: () => void
}
