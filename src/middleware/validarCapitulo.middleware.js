const AJV = require('ajv')
const { default: Ajv } = require('ajv')
const ajv = new Ajv()

const addFormats = require("ajv-formats")
addFormats(ajv)

const capituloSchema = require('../schema/capitulo.schema')


function validarCapitulo(req, res, next) {
    const capitulo = req.body

    // transforma o id_sisdm e capituloId em um tipo number
    if (capitulo.numero && capitulo.cidadeId && capitulo.regiaoId) {
        capitulo.numero = Number(capitulo.numero)
        capitulo.cidadeId = Number(capitulo.cidadeId)
        capitulo.regiaoId = Number(capitulo.regiaoId)
    }

    const validate = ajv.compile(capituloSchema)
    const valid = validate(capitulo)

    if (valid) {
        next()
    } else {
        res.status(400).json({ msg: "Dados inválidos", erros: validate.errors })
    }

}

module.exports = validarCapitulo