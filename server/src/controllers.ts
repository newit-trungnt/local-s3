import { BucketController } from "./features/bucket"
import { ObjectController } from "./features/object"

import { Controller } from "./interface"

const controllers: Controller[] = [new BucketController(), new ObjectController()]

export default controllers