# CSE 6214 Intro to Software Eng. Group 12

This GitHub repo contains the project and project artifacts for the Lab section of CSE 6214.

## Project Goal and Mission
The goal of the project is to build a web-based social media platform. The web application will allow end users to connect with a community of individuals that are united by similar interests, beliefs, ideas, and/or goals. This platform will allow users to connect with their friends, family, and others by posting content on their profile/timeline. Users should be able to post status updates, photos, videos, among other content that is desired. The social media web-application will also provide a platform for a variety of categories of social networking, such as content sharing, media sharing, discussions, consumer reviews, relationships, and/or blogging. There will be 2 versions developed for this project throughout the semester.

## Project Requirements
The initial requirements were provided as:
* A user should be able to login into his account to be able to connect with his friends and access their timeline.
* A user should be able to compose, edit and post status on his/her timeline.
* A user should be able to send and accept friend requests from others which will allow them to be friend with others and enable them to interact with them.
* A user should be able to like, comment and share the status/timeline post of their friends.

## Project Build Details
The project is built with the following languages & techniques:
* Frontend: Javascript, HTML, CSS, Bootstrap
* Backend: NodeJS
* Database: Postgresql

## Team Information
Team Members:
| Name | Net ID | GitHub Email Address | Role |
|---|---|---|---|
| Jessica Henry |jnh426|jnm0024@gmail.com|Project Lead|
| Joel Huber | jth124 | username: hellojoelhuber | Developer |
| Holt Hunter |lhh118|landonhh99@gmail.com|Front End Web Developer|
| Michael Wienczkowski | mhw205 | mhw205@msstate.edu | Software Engineer |

Team Member Availability:
| Name | Monday | Tuesday | Wednesday | Thursday | Friday | Sat | Sunday | 
|---|---|---|---|---|---|---|---|
| Jessica Henry | 6:00-9PM | 5:00 - 5:30PM | 5:30-8PM | 6:15-7PM | Anytime | Rather Not |12-4PM |
| Joel Huber | Anytime, with notice | ditto | ditto | ditto | ditto | ditto | ditto |
| Holt Hunter |3:00-4PM|Rather Not|3:30-8PM|3:30-8PM|3:30-7PM|TBD|3:00-5pm|
| Michael Wienczkowski | 5:30-9PM | 5:30-9PM | 5:30-9PM | 6:30-9PM | 5:30-9PM | Anytime | Anytime |


## Endpoints

### GET

* **/users**: Returns all users in the db.

### POST

* **/createUser**: Adds a user to the db. The body must contain the following object:
{
    "firstName":"Tony",
    "lastName":"Stark",
    "username":"tony",
    "password":"ironman"
}

* **/requestFriend**: Adds a friend request to the db. The body must contain the following object:
{
    "fromId":"2",
    "toId":"1"
}

* **/acceptFriend**: Sets the friend request to true (accepted) or false (rejected), and if accepted, creates a record in friends table. The body must contain the following object:
{
    "request_id":"2",
    "decision":"false"
}