const knex = require("knex");
const { Database } = require("sqlite3");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "DB/tempDB.sqlite3",
    },
});
module.exports = connectedKnex;
