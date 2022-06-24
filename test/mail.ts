const mailgun = require('mailgun-js')
const DOMAIN = 'mail.kmarvin.click'
const API_KEY = 'c21f3906e3a70b172146ed2585a4fe67-4f207195-5c93c4e5'
const mg = mailgun({
    apiKey: API_KEY,
    domain: DOMAIN,
})
const data = {
    from: 'kgmng@mail.kmarvin.click',
    to: 'kgmng920@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!',
}
mg.messages().send(data, function (error: any, body: any) {
    console.log(body)
})
