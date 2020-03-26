// up é o que eu quero fazer no banco

exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // esse 2 é o tam do texto
    });
};

// down é o que eu quero fazer caso dê errado o up

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};