import { connectionWithRunFunction as connection } from '../modules/mysql'
import bcrypt from 'bcrypt'

const getUsers = async (params: any, mysql: any) => {
    console.log('getUsers Success')
    return {
        status: 200,
        data: { users: ['data'] },
    }
}
// users 정보에 id, password, email, age, name
const postUsers = async (
    params: {
        id: string
        password: string
        email: string
        age: number
        name: string
    },
    mysql: connection
) => {
    const { id, password, email, age, name } = params

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await mysql.run(
        'INSERT INTO users (id, password, email, age, name) VALUES (?, ?, ?, ?, ?) ',
        [id, hashedPassword, email, age, name]
    )
    return {
        status: 201,
        data: {},
    }
}

export default { getUsers, postUsers }

// 1. 회원가입 - 회원등록 POST/users / 이메일 인증 코드 발송 / 이메일 인증 코드 검증
// 2. 로그인 - 로그인 (토큰 발급)
// 암호화 string => 암호화된 문자열 =(복호화)=> string
// 해시화 string => 일정한 길이의 치환된 문자열
