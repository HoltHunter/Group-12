const addColumnIcon = require("./helpers/alter-users-add-icon")
const addColumnTheme = require("./helpers/alter-users-add-theme")

module.exports.generateSql = () => `
    ${addColumnIcon}
    ${addColumnTheme}
`
