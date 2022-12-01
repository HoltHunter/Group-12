const createSharedPostColumn = require("./helpers/create-shared-post-column")

module.exports.generateSql = () => `
    ${createSharedPostColumn}
`
