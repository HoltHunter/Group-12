
## Endpoints

Three high-level endpoints:
* /auth
* /create
* /search

You can test if the server is running by sending a GET to '/'

### /auth

* **POST /login**: Returns 200 or 403. The body must contain the following object:
{
    "username":"tony",
    "password":"ironman"
}

* **GET /login**: Returns whether a session exists for a particular user.

* **POST /logout**: Destroys the session.

### /create

* **POST /newUser**: Adds a user to the db. The body must contain the following object:
{
    "firstName":"Tony",
    "lastName":"Stark",
    "username":"tony",
    "password":"ironman"
}

* **POST /friendRequest**: Adds a friend request to the db. The body must contain the following object:
{
    "fromId":"2",
    "toId":"1"
}

* **POST /acceptFriendRequest**: Sets the friend request to true (accepted) or false (rejected), and if accepted, creates a record in friends table. The body must contain the following object:
{
    "request_id":"2",
    "decision":"false"
}

### /search

* **GET /users**: Returns all users in the db.

* **POST /users**: Send a user ID to receive a list of users + friends boolean. 
{
    "userId":"2"
}

* **POST /friendReqests**: Send a user ID to receive a list of open friend requests. If none are open, returns an empty array. 
{
    "userId":"2"
}
