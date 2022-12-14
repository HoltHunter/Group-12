const express = require("express")

const router = express.Router()
const Yup = require("yup")
const pool = require("../src/db")

const formSchema = Yup.object({
    username: Yup.string().required("Email required!"),
    password: Yup.string().required("Password required!"),
})

router
  	.get("/login", async (req, res) => {
      	if (req.session.user && req.session.user.username) {
          	res.json({ loggedIn: true, userId: req.session.user.id, username: req.session.user.username })
      	} else {
          	res.json({ loggedIn: false })
      	}
  	})
  	.post("/login", async (req, res) => {
      	const formData = req.body
      	formSchema
          	.validate(formData)
          	.catch((err) => {
            	res.status(422).send()
            	console.log(err.errors)
      	})

        const { username, password } = req.body
        const result = await pool.query(`
			SELECT u.id, u.username, u.theme, u.profile_icon
			FROM users u
			WHERE u.username = '${username}' 
			AND u.password = '${password}';
		`)
        console.log(result.rows[0])
        if (result.rows.length === 1) {
            res.statusCode = 200
            req.session.user = {
                username: req.body.username,
                id: result.rows[0].id,
            }
            res.json({
                loggedIn: true,
                username,
                userId: result.rows[0].id,
                theme: result.rows[0].theme,
                icon: result.rows[0].profile_icon,
            })
        } else {
            res.statusCode = 403
            res.json({ loggedIn: false, status: "Wrong username or password!" })
        }
    })
    .post("/logout", async (req, res) => {
        req.session.destroy()
        res.statusCode = 200
        res.json({ loggedIn: false, status: "Successfully logged out!" })
    })

module.exports = router
