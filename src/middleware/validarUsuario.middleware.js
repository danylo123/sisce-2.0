const AJV = require('ajv')
const { default: Ajv } = require('ajv')
const ajv = new Ajv()

const addFormats = require("ajv-formats")
addFormats(ajv)

const usuarioSchema = require('../schema/usuario.schema')


function validarUsuario(req, res, next) {
    const usuario = req.body

    // transforma o id_sisdm e capituloId em um tipo number
    if (usuario.id_sisdm && usuario.capituloId) {
        usuario.id_sisdm = Number(usuario.id_sisdm)
        usuario.capituloId = Number(usuario.capituloId)
    }

    const validate = ajv.compile(usuarioSchema)
    const valid = validate(usuario)

    if (valid) {
        next()
    } else {
        res.status(400).json({ msg: "Dados inválidos", erros: validate.errors })
    }

}

module.exports = validarUsuario