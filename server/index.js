const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')

const port = 3001

const app = express()

app.use(cors())
app.use(express())
app.use(express.urlencoded({extended: false}))

app.get("/",async (req,res) => {
    try {
        const connection = await mysql.createConnection(config.db)
        const [result, fields] = await connection.execute('select * from item')
        if (!result) result = []
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: err.message})

    }
})

app.listen(port)