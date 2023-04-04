const express = require('express')
const rotaUsuario = require('./rotas/usuario.rota')
const rotaCapitulo = require('./rotas/capitulo.rota')
const rotaRegiao = require('./rotas/regiao.rota')

const app = express()
app.use(express.json())

app.use('/static', express.static('public'))

app.use('/usuarios', rotaUsuario)
app.use('/capitulos', rotaCapitulo)
app.use('/regioes', rotaRegiao)

app.get('/', (req, res) => {
    res.json({ msg: "Backend SISCE" })
})

app.listen(3000, () => {
    console.log('Servidor SISCE rodando na porta 3000')
})