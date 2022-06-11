const getUsers = async (params: any, mysql: any) => {
    console.log('getUsers Success')
    return {
        uers: ['data'],
    }
}

const postUsers = async (params: any, mysql: any) => {}

export default { getUsers, postUsers }
