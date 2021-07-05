const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { Readable } = require('stream')

const app = express()
const db = require('./config/database')
const { createReadStream } = require('fs')

app.use(fileUpload())
app.use(express.json())
app.use(cors())

const data = new Date()

app.post('/add', async (req, res) => {
    const { user, email, senha } = req.body

    try {
        console.log(data)
        const client = await db.connect()
        await client.query('insert into users("name","email", "password") values($1, $2, $3, $4)', [user, email, senha])
        const resultado = await client.query('select * from users')
        return res.json(resultado.rows)

    } catch (err) {

        console.log(err)
        return res.json({
            status: 401,
            err: err
        })
    }
})

app.get('/list', async (req, res) => {

    const client = await db.connect()
    const resultado = await client.query('select * from users')
    return res.json(resultado.rows)
})

app.delete('/delete', async (req, res) => {

    const { id } = req.body

    const client = await db.connect()
    try {
        await client.query("delete from users where id = $1", [id])
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
    const resultado = await client.query('update users set password = $1, email= $2 WHERE id = $3', [senha, email, id])
    return res.json(resultado.rows)

})

app.listen(3000, () => {
    console.log('Servidor rodando...')
})