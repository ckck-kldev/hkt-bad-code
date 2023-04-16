import { Request, Router } from 'express'
import { client } from '../db'
import { getString, HttpError } from '../express'
import { comparePassword, hashPassword } from '../hash'
import '../session'

export let userRoutes = Router()

userRoutes.get('/users', async (req, res, next) => {
  try {
    let result = await client.query(/* sql */ `
select
  id
, username
from users
`)
    let users = result.rows
    res.json({ users })
  } catch (error) {
    next(error)
  }
})

userRoutes.get('/users/:id/profile', async (req, res, next) => {
  try {
    let user_id = req.params.id
    let result = await client.query(
      /* sql */ `
      select
        username
      , nickname
      , email
      , avatar
      from users
      where id = $1
    `,
      [user_id],
    )
    let user = result.rows[0]
    let nickname = user.nickname || user.username
    if (!nickname) {
      nickname = user.email.split('@')[0]
    }

    result = await client.query(
      /* sql */ `
      select
        id
      , content
      , image
      from memos
      where user_id = $1
    `,
      [user_id],
    )
    let memos = result.rows

    res.json({
      nickname,
      avatar: user.avatar,
      memos,
    })
  } catch (error) {
    next(error)
  }
})

userRoutes.post('/users', async (req, res, next) => {
  try {
    let username = getString(req, 'username')
    let password = getString(req, 'password')
    let password_hash = await hashPassword(password)

    let result = await client.query(
      /* sql */ `
select
  id
from users
where username = $1
    `,
      [username],
    )
    let user = result.rows[0]

    if (user) {
      throw new HttpError(409, 'this username is already in use')
    }

    result = await client.query(
      /* sql */ `
insert into users
(username, password_hash)
values
($1, $2)
returning id
    `,
      [username, password_hash],
    )
    let id = result.rows[0].id

    res.json({
      id,
    })
  } catch (error) {
    next(error)
  }
})

userRoutes.post('/login/password', async (req, res, next) => {
  try {
    let login_id = getString(req, 'login_id')
    let password = getString(req, 'password')

    let result = await client.query(
      /* sql */ `
select
  id
, password_hash
, nickname
, username
, avatar
from users
where username = $1 or email = $1
    `,
      [login_id],
    )
    let user = result.rows[0]

    if (!user) {
      throw new HttpError(403, 'wrong username/email')
    }

    let isMatched = await comparePassword({
      password,
      password_hash: user.password_hash,
    })
    if (!isMatched) {
      throw new HttpError(403, 'wrong username/email or password')
    }

    req.session.user = {
      id: user.id,
      name: user.nickname || user.username || login_id,
      avatar: user.avatar,
    }

    // res.json({ id: user.id })
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

type GoogleProfile = {
  email: string
  name: string
  picture: string
  // e.g. en | zh-HK | zh-TW | en-GB | en-US
  locale: string
}

userRoutes.get('/login/google', async (req, res, next) => {
  try {
    let access_token = req.session?.grant?.response?.access_token

    let googleRes = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    )
    let googleJson: GoogleProfile = await googleRes.json()

    let result = await client.query(
      /* sql */ `
      select id, nickname, avatar
      from users
      where email = $1
    `,
      [googleJson.email],
    )
    let user = result.rows[0]
    if (user) {
      // existing user
      req.session.user = {
        id: user.id,
        name: user.nickname || googleJson.name,
        avatar: user.avatar,
      }
      req.session.save()
      // res.json({ id: user.id })
      res.redirect('/')
      return
    }

    // new user
    result = await client.query(
      /* sql */ `
      insert into users
      (email, nickname, avatar, locale)
      values
      ($1,$2,$3,$4)
      returning id
`,
      [
        googleJson.email,
        googleJson.name,
        googleJson.picture,
        googleJson.locale,
      ],
    )
    let id = result.rows[0].id
    req.session.user = {
      id,
      name: googleJson.name,
      avatar: googleJson.picture,
    }
    req.session.save()
    // res.json({ id })
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

userRoutes.get('/role', (req, res) => {
  res.json({
    user: req.session.user,
  })
})

userRoutes.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
})
