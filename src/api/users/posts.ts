import express from 'express'
import mysql from '../../modules/mysql'

const router = express.Router()

// 특정 user가 소유하고 있는 게시글 전부 읽기
router.get('/users/:userIdx/posts', async (req, res) => {
    const { userIdx } = req.params

    const connection = await mysql.connect()
    const selectUsersPostsResultAll = await connection.run(
        `SELECT title, contents FROM posts WHERE author_idx = ? `,
        [userIdx]
    )
    res.send(selectUsersPostsResultAll)
})

// 특정 user가 소유하고 있는 게시글 중 특정 게시글 읽기
router.get('/users/:userIdx/posts/:postIdx', async (req, res) => {
    const { userIdx } = req.params

    const connection = await mysql.connect()
    const selectUsersPostsResult: {
        title: string
        contents: string
        id: string
    }[] = await connection.run(
        `SELECT p.title, p.contents, u.id 
        FROM posts AS p
        INNER JOIN users AS u 
        ON p.author_idx = u.idx 
        WHERE p.author_idx = ? `,
        [userIdx]
    )
    const response = selectUsersPostsResult.map((data) => {
        const { title, contents, id: userId } = data
        return { title, contents, userId }
    })
    res.send(response)
})

// 특정 유저의 게시글 추가 (title, contents 추가)
router.post('/users/:userIdx/posts', async (req, res) => {
    const { userIdx } = req.params
    const { title, contents } = req.body
    const connection = await mysql.connect()

    const countUserResult = await connection.run(
        `SELECT COUNT(*) AS count FROM users WHERE idx = ?`,
        [userIdx]
    )
    if (countUserResult[0].count !== 1) {
        throw new Error('해당되는 idx의 유저가 존재하지 않습니다')
    }
    console.log(countUserResult)

    await connection.run(
        `INSERT INTO posts (title, contents, author_idx) VALUES (?, ?, ?)`,
        [title, contents, userIdx]
    )
    res.send({ success: true })
})

export default router
