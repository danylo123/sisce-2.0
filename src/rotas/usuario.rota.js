const express = require('express')
const router = express.Router()
const usuarioMid = require('../middleware/validarUsuario.middleware')
const { Usuario, Capitulo } = require('../db/models')
var multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/usuarios')
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
router.post('/', usuarioMid)
router.put('/', usuarioMid)


router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll()
    res.json({ usuarios: usuarios })
})

router.get('/:id', async (req, res) => {
    const usuarios = await Usuario.findByPk(req.params.id,
        { include: [{ model: Capitulo }], raw: true, nested: true })
    const usuarioProcessado = prepararResultado(usuarios)
    res.json({ usuarios: usuarioProcessado })
})

router.post('/:id/upload/foto', upload.single('foto'), async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id)
    if (usuario) {
        usuario.foto = `/static/uploads/usuarios/${req.file.filename}`

        await usuario.save()
        res.json({ msg: "Upload realizado com sucesso" })
    } else {
        res.status(404).json({ msg: "Usuário não encontrado" })
    }

    res.json({ msg: 'Foto salva com sucesso' })
})

router.post('/', async (req, res) => {
    const data = req.body
    if (req.file) {
        data.foto = `/static/uploads/usuarios/${req.file.filename}`
    }
    const usuario = await Usuario.create(data)
    res.json({ msg: "Usuario adicionado com sucesso" })
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
    const usuario = await Usuario.findByPk(id)
    if (usuario) {
        await usuario.destroy()
        res.json({ msg: "Usuário deletado com sucesso" })
    } else {
        res.status(404).json({ msg: "Usuário não encontrado" })
    }
})


function prepararResultado(usuario) {
    const resul = Object.assign({}, usuario)
    if (resul.createdAt) delete resul.createdAt
    if (resul.updatedAt) delete resul.updatedAt
    if (resul.capituloId) delete resul.capituloId
    if (resul['Capitulo.id']) delete resul['Capitulo.id']
    if (resul['Capitulo.createdAt']) delete resul['Capitulo.createdAt']
    if (resul['Capitulo.updatedAt']) delete resul['Capitulo.updatedAt']


    return resul
}

module.exports = router
