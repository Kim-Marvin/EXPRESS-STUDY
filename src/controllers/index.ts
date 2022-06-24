import { Request, Response, NextFunction, Express } from 'express'
import { connectionWithRunFunction } from '../modules/mysql'
import { apiConfigType, apiConfigsType } from '../configs/api'
import path from 'path'
import { authorizer } from '../middlewares/authorizer'

interface RequestWithConnection extends Request {
    mysqlConnection: connectionWithRunFunction
}

const registerAllApis = async (app: Express, configs: apiConfigsType) => {
    // app.get('url', (req, res, next) => {})
    for (const apiName in configs) {
        const apiConfig: apiConfigType = configs[apiName]
        const {
            path: urlPath,
            method,
            handlerPath,
            handlerName,
            authorizer: isRequireAuthorizer,
        } = apiConfig

        const apiModulePath = path.join(__dirname, '../', '../', handlerPath)
        const { default: apiModule } = await import(apiModulePath)
        const handlerFunction: (params: any, mysql: any) => Promise<any> =
            apiModule[handlerName]

        const APIHandler = (
            request: Request,
            response: Response,
            next: NextFunction
        ) => {
            const req = request as RequestWithConnection
            const res = response

            const params = Object.assign({}, req.body, req.params)
            const connection = req.mysqlConnection
            handlerFunction(params, connection)
                .then(
                    (returnObj: {
                        status: number
                        data: { [key: string]: any }
                    }) => {
                        const { status, data } = returnObj
                        res.status(status)
                        res.json(data)
                        // res.json({ success: true, result: result })
                    }
                )
                .catch((e) => next(e))
        }

        app.get('/verify-codes/:verifyCodeIdx', (req, res, next) => {})

        isRequireAuthorizer
            ? app[method](urlPath, authorizer, APIHandler)
            : app[method](urlPath, APIHandler)

        // app[method](path, )
    }
}

export default { registerAllApis }
