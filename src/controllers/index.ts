import { Request, Response, NextFunction, Express } from 'express'
import { connectionWithRunFunction } from '../modules/mysql'
import { apiConfigType, apiConfigsType } from '../configs/api'
import path from 'path'

interface RequestWithConnection extends Request {
    mysqlConnection: connectionWithRunFunction
}

const registerAllApis = async (app: Express, configs: apiConfigsType) => {
    // app.get('url', (req, res, next) => {})
    for (const apiName in configs) {
        const apiConfig: apiConfigType = configs[apiName]
        const { path: urlPath, method, handlerPath, handlerName } = apiConfig

        const apiModulePath = path.join(__dirname, '../', '../', handlerPath)
        const { default: apiModule } = await import(apiModulePath)
        const handlerFunction: (params: any, mysql: any) => Promise<any> =
            apiModule[handlerName]

        app[method](
            urlPath,
            (request: Request, response: Response, next: NextFunction) => {
                const req = request as RequestWithConnection
                const res = response
                const params = req.body
                const connection = req.mysqlConnection
                handlerFunction(params, connection)
                    .then((result: { [key: string]: any }) => {
                        res.json({ success: true, result: result })
                    })
                    .catch((e) => next(e))
            }
        )

        // app[method](path, )
    }
}

export default { registerAllApis }
