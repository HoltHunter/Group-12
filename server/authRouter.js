const express = require("express");
const router = express.Router();
const Yup = require("yup");
const pool = require("../server/db");
//const bcrypt = require("bcrypt");

const formSchema = Yup.object({
    username: Yup.string().required("Email required!"),
    password: Yup.string().required("Password required!"),
})

router
.route("/login")
.get(async (req, res) => {
    console.log(req.session);
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user.username });
    } else {
        res.json({ loggedIn: false});
    }
})
.post(async (req, res) => {
    const formData = req.body;
    formSchema
        .validate(formData)
        .catch(err => {
        res.status(422).send();
        console.log(err.errors);
    })
    .then(valid => {
        if (valid) {
            console.log("Email and Password has been entered.");
        }
    });

    const potentialLogin = await pool.query(
        "SELECT id, username, password FROM users u WHERE u.username=$1", 
        [req.body.username]
    );

    if (potentialLogin.rowCount > 0) {
        const isSamePass = (req.body.password === potentialLogin.rows[0].password);
        if (isSamePass) {
          req.session.user = {
            username: req.body.username,
            id: potentialLogin.rows[0].id,
          };
          res.json({ loggedIn: true, username: req.body.username });
          console.log("successfully logged into a session!");
          console.log(isSamePass);
        } else {
          res.json({ loggedIn: false, status: "Wrong username or password!" });
          console.log("no bueno, wrong password");
          console.log(potentialLogin.rows[0].password);
          console.log(req.body.username);
          console.log(req.body.password);
          console.log(isSamePass);
        }
      } else {
        console.log("no bueno, wrong username");
        res.json({ loggedIn: false, status: "Wrong username or password!" });
      }
});

module.exports = router;