import { RequestHandler } from "express";
import { getFriendReq, insertFriend, rejectFriend, getFriends } from "../../model/entity/friend";
import { errCode } from "../errorHandler";

export const sendFriendReqCtrl: RequestHandler = async (req, res, next) => {
  const { from = 'sungje', to = 'ss' } = req.body
  if (!from || !to)
    return next(new Error(errCode['001']))

  try {
    await insertFriend(from, to)

    return res.send({
      code: 200,
      message: '친구 요청을 보냈습니다.'
    })
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}

export const getReceivedFriendReqCtrl: RequestHandler = async (req, res, next) => {
  const { to = 'ss' } = req.body

  try {
    const requests = await getFriendReq(to)

    return res.send(requests)
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}

export const rejectFriendCtrl: RequestHandler = async (req, res, next) => {
  const { friendId = 0 } = req.body

  try {
    await rejectFriend(friendId)

    return res.send({
      code: 200,
      message: '친구 요청을 거절했습니다.'
    })
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}

export const getFriendsCtrl: RequestHandler = async (req, res, next) => {
  const { userId = 'sungje' } = req.body

  try {
    const friends = await getFriends(userId)
    return res.send(friends)
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}