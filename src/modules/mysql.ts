import mysql, { Connection } from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

// console.log('MYSQL_ID: ', process.env.MYSQL_ID)
// console.log('MYSQL_PASSWORD: ', process.env.MYSQL_PASSWORD)
// console.log('MYSQL_HOST: ', process.env.MYSQL_HOST)
// console.log('MYSQL_DB: ', process.env.MYSQL_DB)
// console.log(process.env)

const DB_URL = `mysql://${process.env.MYSQL_ID}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DB}?ssl={"rejectUnauthorized":true}`

// Username:cdu72z3ppbd4
// Password:pscale_pw_hXQ3tjz620NoPvKyX9r42ceo5wcRMbQm03lV_J7DIK8

interface customConnection extends Connection {
    run?: Function
}

interface connectionWithRunFunction extends Connection {
    run: Function
}

const connect = async () => {
    const connection: customConnection = await mysql.createConnection(DB_URL)
    // const run = async (sql, params = []) => {
    //     const [rows, field] = await connection.execute(sql, params)
    //     return rows
    // }
    // connection.run = run
    // return connection

    const run = async (sql: string, params: any[] = []) => {
        const [rows, field] = await connection.execute(sql, params)
        return rows
    }
    connection.run = run
    return connection as connectionWithRunFunction
}

export default { connect }
