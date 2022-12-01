const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    database: "cse_database",
    user: "cse_username",
    password: "cse_password",
    host: "localhost",
    port: 5432,
    ensureDatabaseExists: true,
    defaultDatabase: "postgres-cse",
})

module.exports = pool
