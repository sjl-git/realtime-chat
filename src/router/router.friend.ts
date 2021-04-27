import { Router } from 'express'

import { sendFriendReqCtrl, getReceivedFriendReqCtrl, rejectFriendCtrl,getFriendsCtrl, acceptFriendCtrl } from "../controller/friend"

const friendRouter = Router()

friendRouter.get('/', getReceivedFriendReqCtrl)
friendRouter.get('/my', getFriendsCtrl)
friendRouter.post('/', sendFriendReqCtrl)
friendRouter.delete('/', rejectFriendCtrl)
friendRouter.put('/', acceptFriendCtrl)

export default friendRouter