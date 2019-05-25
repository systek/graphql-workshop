const memory = require("./memory");
const mongo = require("./mongo");

const useMongo = process.env.USE_MONGO;

module.exports = useMongo ? mongo : memory;
