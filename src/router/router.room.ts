import { Router } from 'express'

import { getChannelsCtrl } from "../controller/room"

const roomRouter = Router()

roomRouter.get('/', getChannelsCtrl)

export default roomRouter