import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { roomRouter, userRouter, friendRouter } from './src/router'
import { errorHandler } from './src/controller/errorHandler'

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('healty')
})

app.use('/user', userRouter)
app.use('/room', roomRouter)
app.use('/friend', friendRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('listening on port')
  console.log(PORT)
})