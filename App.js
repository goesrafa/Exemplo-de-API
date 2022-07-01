// configuração incial da API
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//importações criadas


//Leitura de JSON utilizando middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())
//Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//Rota inicial
app.get('/', (req, res) => {

    res.json({ msg: 'Olá express!!' })
})

//Porta de leitura do express
const DB_USER =  process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.lneog.mongodb.net/?retryWrites=true&w=majority`
)
.then(() =>{
    app.listen(3000)
    console.log('Conectado ao banco')
})
.catch((err) => console.log(err))