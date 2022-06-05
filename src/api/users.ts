import express from 'express'
const router = express.Router()
import mysql from '../modules/mysql'
import { Request, Response, NextFunction } from 'express'
interface RequestWithConnection extends Request {
    mysqlConnection?: any
}

// users: 집합(컬렉션)
// '/users/2/name/' 예시

// GET /users : 컬렉션 리스트 읽기 - 모든 정보 읽기
router.get('/users', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response
    const testConnection = req.mysqlConnection
    console.log('test connection : ', testConnection)

    const connection = await req.mysqlConnection
    const selectData = await connection.run(`SELECT * FROM users;`)

    console.log('select data: ', selectData)
    res.send(selectData)
})

// GET /users/5 : 컬렉션의 한 개체 정보 읽기
router.get('/users/:userIdx', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response
    const userIdx = req.params.userIdx
    const connection = await req.mysqlConnection
    const [selectUserResult] = await connection.run(
        `SELECT * FROM users WHERE idx = ?;`,
        [userIdx]
    )

    console.log('select data: ', selectUserResult)
    res.send(selectUserResult)
})

// POST /users: 컬렉션에 한 개체를 추가함(쓰기)
router.post('/users', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response
    // INSERT 쿼리 (쓰기)
    const { id, password, name, age } = req.body //구조분해할당
    const connection = await req.mysqlConnection
    const insertData = await connection.run(
        `INSERT INTO users (id, password, name, age) VALUES (?,?,?,?);`,
        [id, password, name, age]
    )
    console.log('insert data: ', insertData)
    res.send({ success: true })
})

router.put('/users', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response
    // UPDATE 쿼리 (수정)
    const { id, password, name, age, index } = req.body //구조분해할당
    const connection = await req.mysqlConnection
    const updateData = await connection.run(
        `UPDATE users SET id = ?, password = ?, name = ?, age = ? WHERE idx = ?;`,
        [id, password, name, age, index]
    )
    console.log('update data: ', updateData)
    res.send({ success: true })
})

router.delete('/users', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response
    // DELETE 쿼리 (삭제)
    const { index } = req.body //구조분해할당
    const connection = await req.mysqlConnection
    const deleteData = await connection.run(
        `DELETE FROM users WHERE idx = ?;`,
        [index]
    )
    console.log('delete data: ', deleteData)
    res.send({ success: true })
})

export default router

// RESTful 디자인 규격 적용
