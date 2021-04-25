import * as express from 'express'
import * as bodyParser from 'body-parser'
import { roomRouter, userRouter, friendRouter } from './src/router'
import { errorHandler } from './src/controller/errorHandler'

const app = express()

app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/room', roomRouter)
app.use('/friend', friendRouter)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})