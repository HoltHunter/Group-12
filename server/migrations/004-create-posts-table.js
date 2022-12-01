const createPosts = require("./helpers/create-posts-table")

module.exports.generateSql = () => `
    ${createPosts}
`
