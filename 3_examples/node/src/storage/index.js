const useMongo = process.env.USE_MONGO;

module.exports = useMongo ? require("./mongo") : require("./memory");
