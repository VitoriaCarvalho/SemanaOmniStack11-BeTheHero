const connection = require('../database/connection');
const crypto = require('crypto');
//É um método para criptografia, mas podemos usar uma função de geração de string aleatória.

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs); //já vai voltar como array
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); //4 bytes

        await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
            /**
             * Esse insert pode demorar um pouquinho, por isso definimos a função como assíncrona
             */

        return response.json({ id });
    }
}