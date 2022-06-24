export interface apiConfigType {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    handlerPath: string
    handlerName: string
    authorizer: boolean
}

export type apiConfigsType = { [key: string]: apiConfigType }

const apiConfigs: apiConfigsType = {
    getUsers: {
        path: '/users',
        method: 'get',
        handlerPath: './src/api/users.ts',
        handlerName: 'getUsers',
        authorizer: true,
    },
    postUsers: {
        path: '/users',
        method: 'post',
        handlerPath: './src/api/users.ts',
        handlerName: 'postUsers',
        authorizer: false,
    },
    postAuth: {
        path: '/auth',
        method: 'post',
        handlerPath: './src/api/auth.ts',
        handlerName: 'postAuth',
        authorizer: true,
    },
    verifyEmailCode: {
        path: '/verify-codes/:verifyCodeIdx',
        method: 'get',
        handlerPath: './src/api/verify-codes.ts',
        handlerName: 'verifyEmailCode',
        authorizer: false,
    },
    sendEmailCode: {
        path: '/verify-codes',
        method: 'post',
        handlerPath: './src/api/verify-codes.ts',
        handlerName: 'sendEmailCode',
        authorizer: false,
    },
}

export default apiConfigs
