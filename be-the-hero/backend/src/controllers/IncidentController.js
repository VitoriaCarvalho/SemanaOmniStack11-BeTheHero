const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query; //começando de 1, por padrão

        const [count] = await connection('incidents').count();

        //esquema de paginação
        /*const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //pegando os dados da ong também
            .limit(5) //5 por vez
            .offset((page - 1) * 5) //pular 5 cada vez, de acordo com a página
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
        ]);*/

        const incidents = await connection('incidents')
            .join('ongs', 'incidents.ong_id', '=', 'ongs.id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        console.log(incidents);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { titulo, description, value } = request.body;
        //geralmente as informações de autenticação vem no cabeçalho da requisição, por isso acessamos com request.headers
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            titulo,
            description,
            value,
            ong_id
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params; //para pegar o id
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //vai retornar apenas 1 resultado

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operations not permited' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
        //204: resposta que deu certo, mas não tem conteúdo
    }
}