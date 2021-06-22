const { Pool } = require('pg')

const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Postgres',
    port: 5432,
    database: 'sqlnode'
})

module.exports = cliente