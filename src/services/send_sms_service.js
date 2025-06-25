require('dotenv').config()
const aws = require('aws-sdk')

aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_TOKEN
})

module.exports = function sendSmsService(phone_number, code){
    const sms = new aws.SMS({apiVersion: "2010-03-31"})
    const message = `Você está recebendo o código ${code} para usar na api do Nivaldo`
    sms.publish({
        message,
        phone_number
    }).promise()
}