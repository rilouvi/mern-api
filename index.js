const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const UserRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
});

app.use("/v1/user", UserRoutes)
app.use("/v1/auth", authRoutes)
app.use("/v1/blog", blogRoutes)

app.listen(1215)