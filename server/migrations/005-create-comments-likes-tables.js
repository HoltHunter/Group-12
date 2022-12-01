const createComments = require("./helpers/create-post-comments-table")
const createLikes = require("./helpers/create-posts-likes-table")

module.exports.generateSql = () => `
    ${createComments}
    ${createLikes}
`
