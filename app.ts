import * as express from 'express'
import * as bodyParser from 'body-parser'
import { getReceivedFriendReqCtrl } from './src/controller/friend'
import { errorHandler } from './src/controller/errorHandler'

const app = express()

app.use(bodyParser.json())

app.get('/', getReceivedFriendReqCtrl)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})