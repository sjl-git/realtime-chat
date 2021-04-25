import "reflect-metadata"
import { Column, createQueryBuilder, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import connectMysql from '../../service/mysql'

type FriendStatus = 'pending' | 'success' | 'rejected'

@Entity({ name: "FRIEND", synchronize: false })
@Unique(["from", "to"])
export class FRIEND {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column({ name: "from", type: 'varchar' })
  from: string

  @Column({ name: 'to', type: 'varchar' })
  to: string

  @Column({ name: 'status', type: 'enum', enum: ['pending', 'success'] })
  status: FriendStatus
}

export const getFriendReq = async (to: string) => {

  try {
    await connectMysql()

    const requests = await createQueryBuilder(FRIEND)
      .where("`to`=:to", { to: 'to' })
      .andWhere("status=:status", { status: 'pending'})
      .getMany()

    return requests
  } catch (err) {
    console.log(err.message)
    throw new Error('003')
  }
}

export const insertFriend = async (from: string, to: string) => {

  const params = {
    from,
    to
  }

  try {
    await connectMysql()

    await createQueryBuilder()
      .insert()
      .into(FRIEND)
      .values(params)
      .execute()

    return
  } catch (err) {
    console.log(err)
    console.log(err.message)
    if (err.code === 'ER_DUP_ENTRY')
      throw new Error('004')
    throw new Error('003')
  }
}

export const rejectFriend = async (id: number) => {

  const params = {
    id
  }

  try {
    await connectMysql()

    await createQueryBuilder()
      .update(FRIEND)
      .set({ status: 'rejected' })
      .where('id=:id', params)
      .execute()

    return
  } catch (err) {
    console.log(err)
    throw new Error('003')
  }
}