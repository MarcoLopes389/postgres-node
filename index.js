const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./config/database')

app.use(express.json())
app.use(cors())

const data = new Date()

app.post('/add', async (req, res) => {
    const { user, email, senha } = req.body
    const client = await db.connect()
    await client.query('insert into users("name","email", "password") values($1, $2, $3)', [user, email, senha])
    const resultado = await client.query('select * from users')
    return res.json(resultado.rows)
})

app.get('/list', async (req, res) => {
    const client = await db.connect()
    const resultado = await client.query('select * from users')
    return res.json(resultado.rows)
})

app.delete('/delete', async (req, res) => {

    const { email, senha } = req.body

    const client = await db.connect()
    try {
        await client.query("delete from users where email = $1 and password = $2", [email, senha])
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

app.patch('/update', async (req, res) => {

    const { id, senha, email } = req.body

    const client = await db.connect()
    await client.query('update users set password = $1, email= $2 WHERE id = $3', [senha, email, id])
    return res.json(resultado.rows)

})

app.listen(3000, () => {
    console.log('Servidor rodando...')
})