import { RequestHandler } from "express";
import { getRooms } from "../../model/entity/room";
import { countUsers } from "../../model/entity/user";
import { errCode } from "../errorHandler";

export const getChannelsCtrl: RequestHandler = async (req, res, next) => {
  try{
    const rooms = await getRooms('channel')

    const userCounts = await Promise.all(
      rooms.map(
        async (room) => {
          const count = await countUsers(room.id)
          return { 
            roomId: room.id, 
            count
          }
        }
      )
    )

    res.send({channels: userCounts})
  } catch(err) {
    return next(new Error(errCode[err.message]))
  }
}