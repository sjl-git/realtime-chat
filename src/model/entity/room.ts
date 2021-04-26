import "reflect-metadata"
import { Column, createQueryBuilder, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import connectMysql from '../../service/mysql'

type RoomType = 'channel' | 'dm'

@Entity({ name: "ROOM", synchronize: false })
export class ROOM {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @Column({ type: "enum", enum: ["channel", "dm"], name: "type" })
  type: string
}

export const getRoomById = async (roomId: number) => {
  await connectMysql()

  return await createQueryBuilder(ROOM)
    .where('id=:id', {id: roomId})
    .getOne()
}

export const getRooms = async (type?: RoomType) => {
  try {
    await connectMysql()

    if (!type)
      return await createQueryBuilder(ROOM)
        .getMany()
    else 
      return await createQueryBuilder(ROOM)
        .where('type=:type', {type})
        .getMany()
  } catch(err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}