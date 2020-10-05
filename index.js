const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || "Error"
    const data = error.data || null

    res.status(status).json({
        message: message,
        data: data
    })
});

mongoose.connect("mongodb+srv://riocoba0:RioCoba1@cluster0.jxete.mongodb.net/mern_api?retryWrites=true&w=majority")
.then(() => {
    app.listen(1215)
})
.catch(
    err => console.log(err)
)

