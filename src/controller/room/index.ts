import { RequestHandler } from "express";
import { getRooms } from "../../model/entity/room";
import { errCode } from "../errorHandler";

export const getChannelsCtrl: RequestHandler = async (req, res, next) => {
  try{
    const rooms = await getRooms('channel')
    console.log(rooms)
    res.send({rooms})
  } catch(err) {
    return next(new Error(errCode[err.message]))
  }
}