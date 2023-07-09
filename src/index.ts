import app from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import socketApp from './controllers/socketApp.controller'

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})
const sockets = new Map()
io.on('connection', async (socket) => await socketApp(socket, io, sockets))
// const userChat = io.of('/api/usuario/chats/chat')
// userChat.on('connection', getChat)

httpServer.listen(app.get('port'))
