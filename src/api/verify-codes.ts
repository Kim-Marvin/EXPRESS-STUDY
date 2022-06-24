import mailgun from 'mailgun-js'
import { connectionWithRunFunction as connection } from '../modules/mysql'
import mailgunConfigs from '../configs/mailgun'

// 이메일 인증 코드 검증 = 인증 코드 읽기 GET, /verify-codes/:idx
// code, email
const verifyEmailCode = async (params: any, mysql: connection) => {
    const { verifyCodeIdx, code, email } = params
    const countVerifyCodeResult = await mysql.run(
        `SELECT COUNT(*) as count FROM verify_codes WHERE idx = ? AND email = ? AND code = ?`,
        [verifyCodeIdx, email, code]
    )
    if (countVerifyCodeResult[0].count !== 1) {
        throw new Error('E4000')
    }
    console.log('getUsers Success')
    return {
        status: 200,
        data: {
            isVerified: true,
        },
    }
}

// 이메일 인증 코드 발송 = 인증 코드 생성 POST, /verify-codes
const sendEmailCode = async (params: { email: string }, mysql: connection) => {
    const { email } = params
    const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } = mailgunConfigs

    const code = `${Math.floor(Math.random() * 100000)}`.padStart(6, '0')
    const insertCodeResult = await mysql.run(
        `INSERT INTO verify_codes (email, code) VALUES (?,?)`,
        [email, code]
    )
    const { insertId: idx } = insertCodeResult

    const mailgunClient = new mailgun({
        apiKey: MAILGUN_API_KEY,
        domain: MAILGUN_DOMAIN,
    })
    const sendConfig = {
        from: MAILGUN_FROM,
        to: email,
        subject: '인증코드 발송 메일입니다.',
        text: `인증코드는 ${code}입니다.`,
    }
    mailgunClient.messages().send(sendConfig)
    return { status: 201, data: { idx } }
}

export default { verifyEmailCode, sendEmailCode }
