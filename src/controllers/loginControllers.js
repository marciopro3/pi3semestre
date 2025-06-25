//requerer as variáveis de ambiente
require('dotenv').config()
//requerer o models usuario
const users = require('../models/Users')
//requerer a função de comparar senha
const comparePasswordService = require('../services/compare_password_service')
//requerer a biblioteca jwt
const jwt = require('jsonwebtoken')

class LoginController{
    async login(req, res){
        let {email, password} = req.body
        let user = await users.findByEmail(email)
        
        if(user.values != undefined){
            let passValiated = comparePasswordService(password, user.values.password_hash)
            if(!passValiated){
               res.status(406).json({success: false, message:"Senha Invalida"})
            }else{
               let token = jwt.sign({email: user.values.email, role: user.values.role_id},process.env.SECRET,{expiresIn: 5000}) 
               res.status(200).json({success: true, token: token})
            }
        }else{
            user.values == undefined
            ? res.status(406).json({success: false, message:'E-mail não encontrado'})
            : res.status(404).json({success: false, message: user.error})
        }
    }

}

module.exports = new LoginController