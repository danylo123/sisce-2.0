module.exports = {
    type: "object",
    properties: {
        nome: { type: "string" },
        id_sisdm: { type: "integer" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        status: { type: "string" },
        foto: { type: "string" },
        capituloId: { type: "integer" }
    },
    required: ["nome", "id_sisdm", "email", "password", "status", "capituloId"],
    additionalProperties: false
}