import { Controller, BucketController, ObjectController } from './controller'

const controllers: Controller[] = [new BucketController(), new ObjectController()]

export default controllers
