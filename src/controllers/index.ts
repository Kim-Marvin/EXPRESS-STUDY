import * as path from 'path'

const registerAllApis = async (app, configs) => {
    // app.get('url', (req, res, next) => {})
    for (const apiName in configs) {
        const apiConfig = configs[apiName]
        const { path: urlPath, method, handlerPath } = apiConfig

        const apiModule = await import(
            path.join(__dirname, '../', '../', handlerPath)
        )
        const {} = apiModule
        // app[method](path, )
    }
}

export default { registerAllApis }
