import { userInfo } from "node:os"
import "reflect-metadata"
import { Column, createQueryBuilder, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import connectMysql from '../../service/mysql'
import { getRoomById, ROOM } from "./room"

interface User {
  id: string
  pwd: string
  created_at?: Date
}

@Entity({ name: "USER", synchronize: false })
export class USER {
  @PrimaryColumn({ type: "varchar", name: "id" })
  id: string

  @Column({ type: "varchar", name: "pwd" })
  pwd: string

  @ManyToOne(() => ROOM, room => room.id)
  @JoinColumn({name: 'channel_id'})
  room: ROOM

  @Column({ type: "datetime", name: "created_at" })
  created_at: Date
}

export const insertUser = async (users: User[]) => {
  try {
    await connectMysql()
    await createQueryBuilder()
      .insert()
      .into(USER)
      .values(users)
      .execute()

    return
  } catch (err) {
    console.log(err.code)
    console.log(err.message)
    if (err.code === 'ER_DUP_ENTRY')
      throw new Error('002')
    throw new Error('003')
  }
}

export const getUserById = async (userId: string) => {
  await connectMysql()

  const user = await createQueryBuilder(USER)
    .where('id=:id', { id: userId })
    .getOne()

  return user
}

export const getUsers = async () => {
  await connectMysql()

  const users = await createQueryBuilder(USER)
    .getMany()

  return users
}

export const enterRoom = async (userId: string, roomId: number) => {
  try {
    const cnn = await connectMysql()

    const [user, room] = await Promise.all([
      await getUserById(userId),
      await getRoomById(roomId)
    ])

    user.room = room
    await cnn.manager.save(user)

  } catch (err) {
    console.log(err.message)
    throw new Error('003')
  }
}