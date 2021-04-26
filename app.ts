import * as express from 'express'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { Server } from 'socket.io'
import { roomRouter, userRouter, friendRouter } from './src/router'
import { errorHandler } from './src/controller/errorHandler'

const app = express()
const server = http.createServer(app)
const io = new Server(server);
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('healty')
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/user', userRouter)
app.use('/room', roomRouter)
app.use('/friend', friendRouter)

app.use(errorHandler)

server.listen(PORT, () => {
  console.log('listening on port')
  console.log(PORT)
})
