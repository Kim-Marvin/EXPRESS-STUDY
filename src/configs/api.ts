export default {
    getUsers: {
        path: '/users',
        method: 'get',
        handlerPath: './src/api/users.ts',
        handlerName: 'getUsers',
    },
    postUsers: {
        path: '/users',
        method: 'post',
        handlerPath: './src/api/users.ts',
        handlerName: 'postUsers',
    },
}
