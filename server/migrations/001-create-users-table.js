const createMainTable = require("./helpers/create-users-table")

module.exports.generateSql = () => `
    ${createMainTable} 
`
