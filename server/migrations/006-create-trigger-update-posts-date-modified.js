const createTrigger = require('./helpers/create-trigger-posts-update-date-modified')

module.exports.generateSql = () => `
    ${createTrigger}
`