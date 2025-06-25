//importar a conexao BD
const knex = require('../config/data')

class Users {

    //criar um metodo para buscar todos os usuarios do banco
    async findAll() {
        try {
            let users = await knex.select(["id", "name", "email"]).table('users')
            return { validated: true, values: users }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    //criar um metado para buscar um usuario especifico
    async findById(id) {
        try {
            let user = await knex.select(["id", "name", "email"]).where({ id: id }).table('users')
            return user.length > 0
                ? { validated: true, values: user }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    //criar um metodo para buscar um usuário especifico pelo email
    async findByEmail(email) {
        try {
            let user = await knex.select(
                ["email", "password_hash", "role_id"]
            ).where({ email: email }).table("users")
            return user.length > 0
            ? {validated: true, values: user[0]}
            : {validated: true, values: undefined}
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async create(name, email, password, role) {
        try {

            await knex.insert({
                name: name,
                email: email,
                password_hash: password,
                role_id: role
            }).table('users')

            return { validated: true }

        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async update(id, name, email) {
        //varificar se o usuario existe
        let user = await this.findById(id)
        if (user.values != undefined) {
            //verificando os campos que terão alterasções
            let editUser = {}
            name != undefined ? editUser.name = name : null
            email != undefined ? editUser.email = email : null

            //realizar a alteração dos campos no banco
            try {
                await knex.update(editUser).where({ id: id }).table('users')
                return { validated: true, message: "Usuário editado com Sucesso!!" }

            } catch (error) {
                return { validated: false, error: error }
            }

        } else {
            return { validated: false, error: "Usuário não existente, portanto não pode ser alterado!" }
        }
    }

    async delete(id) {
        //varificar se o usuario existe
        let user = await this.findById(id)
        if (user.values != undefined) {
            //realizar a exclusão do usuário do banco
            try {
                await knex.delete().where({ id: id }).table('users')
                return { validated: true, message: "Usuário Excluido com Sucesso!" }

            } catch (error) {
                return { validated: false, error: error }
            }
        } else {
            return { validated: false, error: "Usuário não existente, portanto não pode ser alterado!" }
        }
    }

    async updatePassword(id, newpassword){
        let user = await this.findById(id)
        if(user.validated == undefined){
            return {validated: false, message: 'Usuário não existe, portanto não pode ser alterado'}
        }else if(!user.validated){
            return {validated: false, message: user.error}
        }else{
            try {
                await knex.update({password_hash: newpassword}).where({id:id}).table('users')
                return {validated: true, message: 'Senha alterada com sucesso!!' }
            } catch (error) {
                return {validated: false, message: error}
            }
        }
    }

}

module.exports = new Users()