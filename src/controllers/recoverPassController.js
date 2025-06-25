require('dotenv').config()
const jwt = require('jsonwebtoken')
const users = require('../models/Users')
const authCodeService = require('../services/auth_code_service')
const sendEmailService = require('../services/send_email_service')
//const sendSmsService = require('../services/send_sms_service')

class RecoverPassController{
     async request(req, res){
        let {email} = req.body
        let user = await users.findByEmail(email)

        if(user.validated == undefined){
            res.status(406).json({sucess: false, message: 'E-mail não encontado'})
        }else if (!user.validated){
            res.status(404).json({sucess: false, message: user.error})
        }else{
           //Envia o código para o usuário
           let code = authCodeService()
           sendEmailService(user.values.email,code.toString())
           let token = jwt.sign({email: user.values.email, authcode: code}, process.env.SECRET, { expiresIn: 900})
           res.status(200).json({sucess: true, id: user.values.id, token: token})
        }
     }

};

module.exports = new RecoverPassController()