const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const UserRoutes = require("./src/routes/users");

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
});

app.use("/v1/", UserRoutes)

app.listen(1215)