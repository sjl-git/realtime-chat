import { RequestHandler } from "express";
import { getFriendReq, insertFriend, rejectFriend, getFriends, acceptFriend } from "../../model/entity/friend";
import { getUsers } from "../../model/entity/user";
import { errCode } from "../errorHandler";

export const sendFriendReqCtrl: RequestHandler = async (req, res, next) => {
  const { from, to } = req.body
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
  const { to } = req.query

  try {
    const users = await getUsers(to)
    const userMap = new Map(users.map(user => [user.id, user.created_at]))

    const requests = await getFriendReq(to)

    const friendInfo = requests.map(request => {
      return {
        id: request.id,
        from: request.from,
        createdAt: userMap.get(request.from)
      }
    })

    return res.send({
      code: 200,
      friendInfo
    })
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}

export const acceptFriendCtrl: RequestHandler = async (req, res, next) => {
  const { friendId } = req.body

  try{
    await acceptFriend(friendId)

    return res.send({
      code: 200,
      message: '친구 요청을 수락햇습니다.'
    })
  } catch(err) {
    return next(new Error(errCode[err.message]))
  }
}

export const rejectFriendCtrl: RequestHandler = async (req, res, next) => {
  const { friendId } = req.body

  try {
    await rejectFriend(friendId)

    return res.send({
      code: 200,
      message: '친구를 거절했습니다.'
    })
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}

export const getFriendsCtrl: RequestHandler = async (req, res, next) => {
  const { userId } = req.query

  const users = await getUsers(userId)
  const userMap = new Map(users.map(user => [user.id, user.created_at]))

  try {
    const friends = await getFriends(userId)

    const friendInfo = friends.map((friend) => {
      let friendId = (friend.from === userId)? friend.to: friend.from
      
      return {
        id: friend.id,
        friendId,
        createdAt : userMap.get(friendId)
      }
    })

    return res.send({
      code: 200,
      friendInfo
    })
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}