require('dotenv').config()
//importar o obj api
const api = require('./src/api')


//inicializar o servidor
api.listen(process.env.PORT,()=>{
    console.log('\n API INICIALIZADA!!')
})
