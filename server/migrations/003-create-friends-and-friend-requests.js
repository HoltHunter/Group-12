const createFriends = require('./helpers/create-friends-table')
const createFriendRequests = require('./helpers/create-friend-requests-table')
const createTriggerFriendReqUpdateDate = require('./helpers/create-trigger-friend-requests-update-date')

module.exports.generateSql = () => `
    ${createFriends}
    ${createFriendRequests}
    ${createTriggerFriendReqUpdateDate}
`