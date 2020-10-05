const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer")
const path = require("path")

const app = express();
const UserRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");
const { use } = require("./src/routes/users");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "_" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" || 
        file.mimetype === "image/jpg" || 
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json())
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
})
.single("image"))

app.use("/public/images", express.static(path.join(__dirname, "public/images")))

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

