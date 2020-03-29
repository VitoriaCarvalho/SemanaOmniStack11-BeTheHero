const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    //antes de cada um dos testes, executar migrate
    beforeEach(async() => {
        //Além de rodar as migrates novamente, é importante desfazer todas as migrações antes, para não deixar o BD com coisas demais que talvez não sejam úteis.
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
        //para que a conexão com o banco não fique aberta depois do término dos testes
    });

    it('shold be able to create a new ONG', async() => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG 3",
                email: "ong3@gmail.com",
                whatsapp: "558994162526",
                city: "Jaicós",
                uf: "PI"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});

/**
 * Obs: para usar um teste com o header, basta colocar assim:
 * .set('Authorization', 'id_que_vc_quer_colocar')
 */


//id-ong: 216d0ee1