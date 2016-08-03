const http = require('http')
const express = require('express')
const router = require('./router')
const UserRegister = require('./lib').UserRegister
const RoleRegister = require('./lib').RoleRegister
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

//const body_parser   = require('body-parser')
//app.use(body_parser())

const multipart = require('connect-multiparty')
app.use(multipart())

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', router)

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('newrole', (role) => {
    RoleRegister(role).then((data) => {
        socket.emit('message', data)
      })
      .catch((err) => {
        socket.emit('message', err)
      })
  })
})

server.listen(port, () => console.log(`server listen in: localhost:${port}`))
