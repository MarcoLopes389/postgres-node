const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./config/database')

app.use(express.json())
app.use(cors())

const data = new Date()

app.post('/add', async (req, res) => {
    const { user, email } = req.body
    const client = await db.connect()
    await client.query('insert into users("name","email") values($1, $2)', [user, email])
    const resultado = await client.query('select * from users')
    return res.json(resultado.rows)
})

app.get('/list', async (req, res) => {
    const client = await db.connect()
    const resultado = await client.query('select * from users')
    return res.json(resultado.rows)
})

app.delete('/deleteall', async (req, res) => {
    const client = await db.connect()
    try {
        await client.query("delete from users where email= 'nenhum@gmail.com'")
        let ok = true
        return res.json({
            ok: ok
        })
    } catch {
        let ok = false
        return res.json({
            ok: ok
        })
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando...')
})