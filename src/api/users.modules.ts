// GET /users: users의 모든 정보 읽기 (컬렉션 리스트 읽기)

// request => params, mysql
// response => status, bodydata

const getUsers = async (params: any, mysql: any) => {
    console.log('getUsers Success')
    return {
        status: 200,
        data: {
            users: ['data'],
        },
    }
}

const postUsers = async (params: any, mysql: any) => {
    throw new Error('E1000')
}

export default { getUsers, postUsers }
