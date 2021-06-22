const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./config/database')

app.use(express.json())
app.use(cors())

const data = new Date()

app.post('/add', async (req, res) => {
    const { user, email } = req.body
    await db.connect()
    await db.query('insert into users("name","email") values($1, $2)', [user, email])
    const resultado = await db.query('select * from users')
    await db.end()
    return res.json(resultado.rows)
})

app.get('/list', async (req, res) => {
    await db.connect()
    const resultado = await db.query('select * from users')
    await db.end()
    return res.json(resultado.rows)
})

app.listen(3000, () => {
    console.log('Servidor rodando...')
})