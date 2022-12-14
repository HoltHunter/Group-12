const { expect } = require("chai")
const { assert } = require("chai")
const chai = require("chai")
const chaiHttp = require("chai-http")
const { before } = require("mocha")
const app = require("../app")
const setup = require("../src/setup")

chai.use(chaiHttp)

const baseUrl = "http://localhost:8081"

/* NOTE: You must be running the app server for these tests to pass. */

before("setup db", async () => {
    await setup.connect()

    it("Should create a new user.", (done) => {
        chai.request(app)
            .post("/create/newUser", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({
                firstName: "Tony", lastName: "Stark", username: "tony@stark.com", password: "ironman",
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })

    it("Should create a new user.", (done) => {
        chai.request(app)
            .post("/create/newUser", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({
                firstName: "Steve", lastName: "Rogers", username: "steve@rogers.com", password: "captainamerica",
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })

    it("Should create a new user.", (done) => {
        chai.request(app)
            .post("/create/newUser", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({
                firstName: "Thor", lastName: "Odinson", username: "thor@odinson.com", password: "strongestavenger",
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})

describe("Login (API)", () => {
    it("Should login.", (done) => {
        chai.request(app)
            .post("/auth/login", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ username: "tony@stark.com", password: "ironman" })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should logout.", (done) => {
        chai.request(app)
            .post("/auth/logout", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})

describe("Search for Users", () => {
    it("Should return a list of users.", (done) => {
        chai.request(app)
            .post("/search/users", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ userId: 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})

describe("Make Friends", () => {
    it("Should create a friend request", (done) => {
        chai.request(app)
            .post("/create/friendRequest", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ fromId: 1, toId: 2 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should accept a friend request", (done) => {
        chai.request(app)
            .post("/create/acceptFriendRequest", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ request_id: 1, decision: true })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })

    it("Should create a friend request", (done) => {
        chai.request(app)
            .post("/create/friendRequest", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ fromId: 1, toId: 3 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should accept a friend request", (done) => {
        chai.request(app)
            .post("/create/acceptFriendRequest", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ request_id: 2, decision: true })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})

describe("Make Post & Comment", () => {
    it("Should create a post", (done) => {
        chai.request(app)
            .post("/create/newPost", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ userId: 2, postContent: "I am Steve Rogers." })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should comment on the post", (done) => {
        chai.request(app)
            .post("/create/post/comment", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ userId: 1, postId: 1, comment: "Can you believe this guy?" })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should like the post", (done) => {
        chai.request(app)
            .post("/create/likes", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ userId: 3, postId: 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should share a post", (done) => {
        chai.request(app)
            .post("/create/newPost", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ userId: 3, postContent: "See how the mortals introduce themselves? So formal.", sharedPostId: 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})


describe("Check User Properties", () => {
    it("Correct theme for logged in user", (done) => {
        chai.request(app)
            .post("/auth/login", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ username: "tony@stark.com", password: "ironman" })
            .end((err, res) => {
                assert.equal("classic", res.body.theme)
                done()
            })
    })
    it("Correct icon for logged in user", (done) => {
        chai.request(app)
            .post("/auth/login", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ username: "tony@stark.com", password: "ironman" })
            .end((err, res) => {
                assert.equal("alpha", res.body.icon)
                done()
            })
    })
    it("Correct icon on user post", (done) => {
        chai.request(app)
            .post("/search/posts", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ userId: 1 })
            .end((err, res) => {
                assert.equal("alpha", res.body[0].profile_icon)
                done()
            })
    })
    it("Correct icon on user comment", (done) => {
        chai.request(app)
            .post("/search/posts/2/comments/1", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .end((err, res) => {
                assert.equal("alpha", res.body[0].profile_icon)
                done()
            })
    })
})

describe("View Posts", () => {
    it("View posts", (done) => {
        chai.request(app)
            .post("/search/posts", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ userId: 1 })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("View post comments", (done) => {
        chai.request(app)
            .post("/search/posts/2/comments/1", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})

describe("Edit user properties", () => {
    it("Should change the icon", (done) => {
        chai.request(app)
            .patch("/create/settings/1", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ settings: { icon: "beta" } })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should change the theme", (done) => {
        chai.request(app)
            .patch("/create/settings/2", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ settings: { theme: "dark" } })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
    it("Should change the icon and theme", (done) => {
        chai.request(app)
            .patch("/create/settings/3", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .send({ settings: { icon: "gamma", theme: "monochrome" } })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})
