const express = require('express')
const router = express.Router()
const capituloMid = require('../middleware/validarCapitulo.middleware')
const { Capitulo, Regiao, Cidade } = require('../db/models')
var multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/brasao-capitulos')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


const fileFilter = (req, file, cb) => {
    const extensoes = /jpeg|jpg|png/i
    if (extensoes.test(path.extname(file.originalname))) {
        cb(null, true)
    } else {
        return cb('Arquivo não suportado, permitido apenas jpg, jpeg e png')
    }
}

var upload = multer({ storage: storage, fileFilter: fileFilter })

router.post('/', upload.single('foto'))
router.post('/', capituloMid)
router.put('/', capituloMid)


router.get('/', async (req, res) => {
    const capitulos = await Capitulo.findAll()
    res.json({ capitulos: capitulos })
})

router.get('/:id', async (req, res) => {
    const capitulos = await Capitulo.findByPk(req.params.id,
        { include: [{ model: Regiao, Cidade }], raw: true, nested: true })
    const capituloProcessado = prepararResultado(capitulos)
    res.json({ capitulos: capituloProcessado })
})

router.post('/:id/upload/brasao', upload.single('foto'), async (req, res) => {
    const id = req.params.id
    const capitulo = await Capitulo.findByPk(id)
    if (capitulo) {
        capitulo.foto = `/static/uploads/brasao-capitulos/${req.file.filename}`

        await capitulo.save()
        res.json({ msg: "Upload realizado com sucesso" })
    } else {
        res.status(404).json({ msg: "Usuário não encontrado" })
    }

    res.json({ msg: 'Imagem salva com sucesso' })
})

router.post('/', async (req, res) => {
    const data = req.body
    if (req.file) {
        data.foto = `/static/uploads/brasao-capitulos/${req.file.filename}`
    }
    const capitulo = await Capitulo.create(data)
    res.json({ msg: "Capitulo adicionado com sucesso" })
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const usuario = await Usuario.findByPk(id)
    if (usuario) {
        usuario.nome = req.body.nome
        usuario.id_sisdm = req.body.id_sisdm
        usuario.email = req.body.email
        usuario.status = req.body.status
        usuario.password = req.body.password
        await usuario.save()
        res.json({ msg: "Usuário atualizado com sucesso" })
    } else {
        res.status(404).json({ msg: "Usuário não encontrado" })
    }
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const capitulo = await Capitulo.findByPk(id)
    if (capitulo) {
        await capitulo.destroy()
        res.json({ msg: "Capitulo deletado com sucesso" })
    } else {
        res.status(404).json({ msg: "Capitulo não encontrado" })
    }
})


function prepararResultado(capitulo) {
    const resul = Object.assign({}, capitulo)
    if (resul.createdAt) delete resul.createdAt
    if (resul.updatedAt) delete resul.updatedAt
       


    return resul
}

module.exports = router
