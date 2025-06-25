const users = require('../models/Users')
const hashPasswordService = require('../services/hash_password_service')

class UsersControllers{
    async listAll(req,res){
        let result = await users.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message: result.error})
        :res.status(200).json({sucess:true, values: result.values})
    }

    async listOne(req,res){
        
        if(isNaN(req.params.id)){
            res.status(400).json({sucess: false, message: "ID Inválido!"})
        }else{
            let result = await users.findById(req.params.id)
            if(!result.validated){
                res.status(404).json({sucess:false, message: result.error})
            }else{
                result.values == undefined
                ?res.status(406).json({sucess: false, message: "Usuário não Encontrado!"})
                :res.status(200).json({sucess:true, values: result.values})
            }
        
        }
    }

    async new(req,res){
        let {name, email, password, role} = req.body
        
        let result = await users.create(name, email, hashPasswordService(password), role)

        result.validated
        ? res.status(201).json({success: true, message:'Usuário Cadastrado com Sucesso'})
        : res.status(404).json({success: false, message: result.error})
    }

    async editUser(req,res){
        let id = req.params.id
        let {name,email} = req.body
        if(isNaN(id)){
            res.status(404).json({success: false, message: "Parametro Inválido"})
        }else{
            let result = await users.update(id,name,email)
            result.validated
            ? res.status(200).json({success: true, message: result.message})
            : res.status(406).json({success: false, message: result.error}) 
        }
    }

    async remove(req, res){
        let id = req.params.id
        if(isNaN(id)){
            res.status(404).json({success: false, message: "Parametro Inválido"})
        }else{
            let result = await users.delete(id)
            result.validated
            ? res.status(200).json({success: true, message: result.message})
            : res.status(406).json({success: false, message: result.error}) 
        }
    }
    async alterPassword(req,res){
        let id = req.params.id
        if(isNaN(id)){
            res.status(404).json({sucess: false, message: 'Parametro Inválido'})
        }else{
            let newpassword = hashPasswordService(req.body.newpassword)
            let result = await users.updatePassword(id, newpassword)
            result.validated
            ? res.status(200).json({success: true, message: result.message})
            : res.status(406).json({success: false, message: result.error}) 
        }

    }
}

module.exports = new UsersControllers()