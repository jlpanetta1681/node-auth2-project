const express = reqiure("express");

const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(helmet()); s
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter)
server.use("/api/users", usesRouter);

server.get("/", (req, res) => {
    res.json({ api: "running" })
});
module.exports = server;