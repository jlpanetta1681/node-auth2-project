const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Users = require("./users/users-model.js");
const { isValid } = require("./users/users-service/js");
const { jwtSecret } = require("./secrets");


routeer.posr("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;


        Users.add(credentialss)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(err => {
                res.status(400).json({ message: "Please provide username and password" });
            });
    };
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;


    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user, password)) {
                    const token = makeToken(user);
                    res.status(201).json({ message: "Welcome!", tolen });
                } else {
                    res.status(401).json({ message: "invalid credentials!" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })

    } else {
        res.status(400).json({ message: "please provisdeuserbame and password" });
    }
})
function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.departent
    };
    const options = {
        expiresIn: "60 seconds",
    };
    return jwt.sign(payload, jwtsecret, options)
};

module.exports = router;