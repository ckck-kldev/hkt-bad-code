import express, { Router } from 'express'
import formidable from 'formidable'
import { mkdirSync } from 'fs'
import { unlink } from 'fs/promises'
import { join } from 'path'
import socketIO from 'socket.io'
import { client } from '../db'
import { checkString, HttpError } from '../express'
import { getSessionUser, hasLogin } from '../guards'

let uploadDir = join('uploads', 'memo-images')
mkdirSync(uploadDir, { recursive: true })

let form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFileSize: 1024 * 1024 * 2,
  filter: part => {
    console.log('filter part:', part)
    return part.mimetype?.startsWith('image/') || false
  },
})

type Memo = {
  id: number
  content: string
  user_id: number
  image?: string
}

export function createMemoRoutes(io: socketIO.Server) {
  let memoRoutes = Router()

  memoRoutes.use('/uploads/memo-images', express.static(uploadDir))

  memoRoutes.get('/memos', async (req, res, next) => {
    try {
      let result = await client.query(
        /* sql */ `
      select
        memos.id
      , memos.content
      , memos.user_id
      , memos.image
      , users.username
      , users.nickname
      , users.email
      from memos
      inner join users on users.id = memos.user_id
    `,
        [],
      )
      let memos = result.rows
      for (let memo of memos) {
        let name = memo.nickname || memo.username
        if (!name) {
          name = memo.email.split('@')[0]
        }
        delete memo.username
        delete memo.email
        memo.nickname = name
      }
      res.json({ memos })
    } catch (error) {
      next(error)
    }
  })

  memoRoutes.post('/memos', hasLogin, (req, res, next) => {
    form.parse(req, async (err, fields, files) => {
      // console.log({ err, fields, files })
      if (err) {
        next(err)
        return
      }
      try {
        let content = checkString('content', fields.content)
        let imageMaybeArray = files.image
        let image = Array.isArray(imageMaybeArray)
          ? imageMaybeArray[0]
          : imageMaybeArray
        let user_id = getSessionUser(req).id
        let filename = image?.newFilename

        console.log('insert memos:', { content, user_id, filename })

        let result = await client.query(
          /* sql */ `
        insert into memos
        (content, user_id, image)
        values
        ($1, $2, $3)
        returning id
      `,
          [content, user_id, filename],
        )
        let id = result.rows[0].id

        res.json({ id })

        let memo: Memo = {
          id,
          content,
          user_id,
          image: filename,
        }
        io.emit('new-memo', memo)
      } catch (error) {
        next(error)
      }
    })
  })

  memoRoutes.delete('/memos/:id', hasLogin, async (req, res, next) => {
    try {
      let id = +req.params.id
      let user_id = getSessionUser(req).id

      let result = await client.query(
        /* sql */ `
      select
        user_id
      , image
      from memos
      where id = $1
    `,
        [id],
      )
      let memo = result.rows[0]

      if (!memo) {
        res.json({ details: 'the memo is already deleted' })
        return
      }

      if (memo.user_id !== user_id) {
        throw new HttpError(
          403,
          "You are not allowed to delete other users's memo",
        )
      }

      if (memo.image) {
        try {
          await unlink(join(uploadDir, memo.image))
        } catch (error) {
          // maybe another request is deleting it at the same time
        }
      }

      result = await client.query(
        /* sql */ `
      delete from memos
      where id = $1
        and user_id = $2
    `,
        [id, user_id],
      )

      if (result.rowCount > 0) {
        res.json({ details: 'the memo is just deleted' })
      } else {
        res.json({ details: 'the memo is already deleted' })
      }
    } catch (error) {
      next(error)
    }
  })

  return memoRoutes
}
