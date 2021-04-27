import { RequestHandler } from 'express'
import { getFriends } from '../../model/entity/friend'

import { enterRoom, leaveRoom, insertUser, getUsers, getUser } from '../../model/entity/user'
import { errCode } from '../errorHandler'

export const createUserCtrl: RequestHandler = async (req, res, next) => {

  const { id, pwd } = req.body
  if (!id || !pwd) return next(new Error(errCode['001']))

  const param = {
    id,
    pwd
  }

  try {
    await insertUser([param])
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }


  return res.send({
    code: 200,
    message: '유저를 생성했습니다.'
  })
}

export const enterRoomCtrl: RequestHandler = async (req, res, next) => {
  const { userId, roomId} = req.body

  if (!userId || !roomId) return next(new Error(errCode['001']))

  try {
    await enterRoom(userId, roomId)
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }

  return res.send({
    code: 200,
    message: '방에 입장하였습니다.'
  })
}

export const leaveRoomCtrl: RequestHandler = async (req, res, next) => {
  const { userId} = req.body

  if (!userId) return next(new Error(errCode['001']))

  try {
    await leaveRoom(userId)
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }

  return res.send({
    code: 200,
    message: '방에 입장하였습니다.'
  })
}

export const getUsersCtrl: RequestHandler = async (req, res, next) => {
  const { userId } = req.query

  const users = await getUsers(userId)

  const userFriends = await getFriends(userId)
  const userFriendIds = userFriends.map(friend => {
    if (friend.from !== userId)
      return friend.from
    else
      return friend.to
  })

  let userInfo = await Promise.all(users.map(async (user) => {
    const friends = await getFriends(user.id)
    let isFriend = false
    if (userFriendIds.includes(user.id))
      isFriend = true

    return {
      id: user.id,
      created_at: user.created_at,
      friendCount: friends.length,
      isFriend
    }
  }))

  return res.send({
    code: 200,
    userInfo
  })
}

export const getUserCtrl: RequestHandler = async (req, res, next) => {
  const { id, pwd } = req.query
  if (!id || !pwd)
    return next(new Error(errCode['001']))

  try {
    const user = await getUser(id, pwd)

    return res.send({
      code: 200,
      user
    })
  } catch (err) {
    return next(new Error(errCode[err.message]))
  }
}