import express, { Request, Response } from 'express'
interface ReqeustWithConnection extends Request {
    mysqlConnection: any
}

const router = express.Router()

router.get('/err', (req, res) => {
    throw new Error('갑작스러운 에러')
    res.send({ text: 'hello' })
})

router.post('/async', (req, res, next) => {
    const api = async (req: ReqeustWithConnection, res: Response) => {
        const connection = req.mysqlConnection
        const selectUsersResults = await connection.run(`SELECT * FROM users22`)
        return { data: selectUsersResults }
    }
    api(req as ReqeustWithConnection, res)
        .then((result) => {
            res.json({
                success: true,
                result: result,
            })
        })
        .catch((e) => {
            next(e)
        })
})

export default router
