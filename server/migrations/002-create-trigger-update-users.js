const createFnUpdateDateMod = require("./helpers/create-function-update-date-modified")
const createTriggerUsersDateMod = require("./helpers/create-trigger-users-update-date-modified")

module.exports.generateSql = () => `
    ${createFnUpdateDateMod}
    ${createTriggerUsersDateMod}
`
