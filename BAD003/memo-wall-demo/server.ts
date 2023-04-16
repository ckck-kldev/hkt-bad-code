import express, { NextFunction, Request, Response } from 'express'
import { print } from 'listening-on'
import { createMemoRoutes } from './routes/memo.routes'
import { userRoutes } from './routes/user.routes'
import { sessionMiddleware } from './session'
import http from 'http'
import socketIO from 'socket.io'
import grant from 'grant'
import { env } from './env'

let app = express()
let server = new http.Server(app)
let io = new socketIO.Server(server)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(sessionMiddleware)

app.use(
  grant.express({
    defaults: {
      origin: 'http://localhost:' + env.PORT,
      transport: 'session',
      state: true,
    },
    google: {
      key: env.GOOGLE_CLIENT_ID,
      secret: env.GOOGLE_CLIENT_SECRET,
      scope: ['email', 'profile'],
      callback: '/login/google',
    },
  }),
)

app.use(userRoutes)
app.use(createMemoRoutes(io))

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  if ('statusCode' in error) {
    res.status(error.statusCode)
  } else {
    res.status(500)
  }
  let message = String(error)
  message = message.replace(/\w+: /, '')
  res.json({
    error: message,
  })
})

app.use((req, res, next) => {
  res.status(404)
  res.json({ error: 'Route not found' })
})

server.listen(env.PORT, () => {
  print(env.PORT)
})
