const express = require('express')
const router = express.Router()
const regiaoMid = require('../middleware/validarRegiao.middleware')
const { Regiao } = require('../db/models')



router.post('/', regiaoMid)
router.put('/', regiaoMid)


router.get('/', async (req, res) => {
    const regiaos = await Regiao.findAll()
    res.json({ regiaos: regiaos })
})

router.get('/:id', async (req, res) => {
    const regiao = await Regiao.findByPk(req.params.id)
    const regiaoProcessada = prepararResultado(regiao)
    res.json({ regiao: regiaoProcessada })
})

router.post('/', async (req, res) => {
    const data = req.body
    const regiao = await Regiao.create(data)
    res.json({ msg: "Região adicionada com sucesso" })
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const regiao = await Regiao.findByPk(id)
    if (regiao) {
        regiao.nome = req.body.nome
        await regiao.save()
        res.json({ msg: "Região atualizada com sucesso" })
    } else {
        res.status(404).json({ msg: "Região não encontrada" })
    }
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const regiao = await Regiao.findByPk(id)
    if (regiao) {
        await regiao.destroy()
        res.json({ msg: "Região deletada com sucesso" })
    } else {
        res.status(404).json({ msg: "Região não encontrada" })
    }
})


function prepararResultado(regiao) {
    const resul = Object.assign({}, regiao)
    if (resul.createdAt) delete resul.createdAt
    if (resul.updatedAt) delete resul.updatedAt
    console.log(resul)
    return resul    
}

module.exports = router
