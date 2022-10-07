const users = {
    "john" : {
        username: "john",
        password: "password"
    },
    "joan" : {
        username: "joan",
        password: "wordpass"
    }
}

exports.authenticate = (username, password) => {
    if (users[username] && users[username].password === password) {
        return true
    } else {
        return false
    }
}
