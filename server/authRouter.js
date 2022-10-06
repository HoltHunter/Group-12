const express = require("express");
const router = express.Router();
const Yup = require("yup");

const formSchema = Yup.object({
    username: Yup.string().required("Email required!"),
    password: Yup.string().required("Password required!"),
})

router.post("/login", (req, res) => {
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
});

module.exports = router;