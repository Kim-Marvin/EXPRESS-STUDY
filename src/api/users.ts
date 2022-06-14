const getUsers = async (params: any, mysql: any) => {
    console.log('getUsers Success')
    return {
        status: 200,
        data: { users: ['data'] },
    }
}

const postUsers = async (params: any, mysql: any) => {
    throw new Error('sql syntax error')
}

export default { getUsers, postUsers }
