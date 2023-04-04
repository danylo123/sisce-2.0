const AJV = require('ajv')
const { default: Ajv } = require('ajv')
const ajv = new Ajv()

const addFormats = require("ajv-formats")
addFormats(ajv)

const regiaoSchema = require('../schema/regiao.schema')


function validarRegiao(req, res, next) {
    const regiao = req.body

    const validate = ajv.compile(regiaoSchema)
    const valid = validate(regiao)

    if (valid) {
        next()
    } else {
        res.status(400).json({ msg: "Dados inválidos", erros: validate.errors })
    }

}

module.exports = validarRegiao