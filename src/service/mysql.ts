import { createConnection, Connection } from 'typeorm'
import config from '../config'
import { FRIEND } from '../model/entity/friend'
import { ROOM } from '../model/entity/room'

import { USER } from '../model/entity/user'


let connection: Connection

const createConn = async () => {
  if (!connection)
    connection = await createConnection({
      name: 'default',
      type: 'mysql',
      host: config.get('MYSQL_HOST'),
      username: config.get('MYSQL_USER'),
      password: config.get('MYSQL_PASSWORD'),
      database: config.get('MYSQL_DATABASE'),
      entities: [USER, ROOM, FRIEND],
      synchronize: false
    })

  console.log('connected to database')
  return connection
}

export default createConn