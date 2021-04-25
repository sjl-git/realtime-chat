import { Router } from 'express'

import { getChannelsCtrl } from "../controller/room"

const roomRouter = Router()

roomRouter.post('/', getChannelsCtrl)

export default roomRouter