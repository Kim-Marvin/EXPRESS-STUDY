import { ErrorRequestHandler } from 'express'
import errorConfigs from '../configs/error'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    const errMessage: string = err.toString()
    let errCode = errMessage.replace('Error:', '')

    let errConfig = errorConfigs[errCode]
    if (!errConfig) {
        errCode = 'E0000'
        errConfig = errorConfigs[errCode]
    }
    const { message, status } = errConfig
    res.status(status)
    res.send({
        errorMessage: message,
    })
}
