const { Client } = require('pg')

const cliente = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'Postgres',
    port: 5432,
    database: 'sqlnode'
})

module.exports = cliente