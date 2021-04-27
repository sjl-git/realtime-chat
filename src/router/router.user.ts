import { Router } from 'express'

import { createUserCtrl, enterRoomCtrl, getUsersCtrl, getUserCtrl, leaveRoomCtrl} from "../controller/user"

const userRouter = Router()

userRouter.post('/', createUserCtrl)
userRouter.get('/', getUsersCtrl)
userRouter.get('/login', getUserCtrl)
userRouter.put('/enter', enterRoomCtrl)
userRouter.put('/leave', leaveRoomCtrl)

export default userRouter