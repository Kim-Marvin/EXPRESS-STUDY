import * as path from 'path'

const registerAllApis = async (app, configs) => {
    // app.get('url', (req, res, next) => {})
    for (const apiName in configs) {
        const apiConfig = configs[apiName]
        const { path: urlPath, method, handlerPath, handlerName } = apiConfig

        const apiModule = await import(
            path.join(__dirname, '../', '../', handlerPath)
        )
        const handlerFunction: (params: any, mysql: any) => Promise<any> =
            apiModule[handlerName]

        app[method](path, (req, res, next) => {
            const params = req.body
            const connection = req.mysqlConnection
            handlerFunction(params, connection)
                .then((result) => {
                    res.json({ success: true, result: result })
                })
                .catch((e) => next(e))
        })

        // app[method](path, )
    }
}

export default { registerAllApis }
