module.exports = {
    type: "object",
    properties: {
        nome: { type: "string" },
        numero: { type: "integer" },
        brasao: { type: "string" },
        cidadeId: { type: "integer" },
        regiaoId: { type: "integer" },
    },
    required: ["nome", "numero", "cidadeId", "regiaoId"],
    additionalProperties: false
}