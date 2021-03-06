import { connectionWithRunFunction as connection } from '../modules/mysql'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const postAuth = async (
    params: { id: string; password: string },
    mysql: connection
) => {
    const { id, password } = params

    const selectHashedPassword = await mysql.run(
        'SELECT password FROM user WHERE id = ?',
        [id]
    )
    const isEqual = await bcrypt.compare(
        password,
        selectHashedPassword[0].password
    )
    if (!isEqual) {
        throw new Error('비밀번호가 일치하지 않습니다.')
    }

    const payload = { id }
    const secret = 'web-study'
    const token = JWT.sign(payload, secret)
    return {
        status: 201,
        data: { token },
    }
}

export default { postAuth }
