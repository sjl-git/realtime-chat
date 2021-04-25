import { RequestHandler } from 'express'

import { enterRoom, insertUser, getUsers } from '../../model/entity/user'
import { errCode } from '../errorHandler'

export const createUserCtrl: RequestHandler = async( req, res, next) => {

  const {id, pwd} = req.body
  if (!id || !pwd) return next(new Error(errCode['001']))

  const param = {
    id,
    pwd
  }

  try{
    await insertUser([param])
  } catch(err) {
    return next(new Error(errCode[err.message]))
  }


  return res.send({
    code: 200,
    message: '유저를 생성했습니다.'
  })
}

export const enterRoomCtrl: RequestHandler = async( req, res, next) => {
  const {userId = 'sungje', roomId = 1} = req.body

  if (!userId || !roomId) return next(new Error(errCode['001']))

  try{
    await enterRoom(userId, roomId)
  } catch(err) {
    return next(new Error(errCode[err.message]))
  }

  return res.send({
    code: 200,
    message: '방에 입장하였습니다.'
  })
}

export const getUsersCtrl: RequestHandler = async (req, res, next) => {
  const users = await getUsers()

  return res.send(users)
}