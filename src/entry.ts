import express, { ErrorRequestHandler } from 'express'
import cors from 'cors'
import usersRouter from './api/users'
import usersPostsRouter from './api/users/posts'
import testRouter from './api/users/test'

import { useMysql } from './middlewares/useMysql'

const app = express()
const PORT = 3714

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(useMysql)

app.use('/v1', usersRouter) // 라우터 : 경로를 매핑
app.use('/v1', usersPostsRouter)
app.use('/test', testRouter)
// 모든 API들의 설정값만 갖고 와서 전부 등록이 가능한 함수
// controller 계층(함수)
// Async Wrapper => (req, res, next)
// 변수, 응답 (req, rex)가 아닌 (params, mysql) => return 으로 응답하도록

app.get('/err-test', (req, res) => {
    throw new Error('갑작스러운 에러')
    res.send({
        text: 'Error Test Message : hello',
    })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    res.send({ text: 'error' })
}

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

// RESTful 디자인 규격 적용
// 1. app.get 직접 등록
// 2. router 모듈을 사용한 등록 - 비슷한 것들 끼리 라우터 단위로 묶어서 모듈화 편리하게 사용 가능
