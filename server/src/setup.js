const migrate = require("postgres-migrations");

// exports.connect = async (pool, path) => {
exports.connect = async () => {
    console.log("I'm setting up the db, maybe.")

    const dbConfig = {
        database: "cse_database",
        user: "cse_username",
        password: "cse_password",
        host: "localhost",
        port: 5432,

        // Default: false for backwards-compatibility
        // This might change!
        ensureDatabaseExists: true,

        // Default: "postgres"
        // Used when checking/creating "database-name"
        defaultDatabase: "postgres"
    }

    // await migrate.migrate(pool, path)
    await migrate.migrate(dbConfig, "./migrations")
}
