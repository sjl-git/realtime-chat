import { Router } from 'express'

import { createUserCtrl, enterRoomCtrl, getUsersCtrl} from "../controller/user"

const userRouter = Router()

userRouter.post('/', createUserCtrl)
userRouter.get('/', getUsersCtrl)

export default userRouter