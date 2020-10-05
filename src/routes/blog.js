const express = require("express");
const router = express.Router();
const {body} = require("express-validator")

const blogController = require("../controllers/blog")

router.post("/post", [
    body("title").isLength({min:10}).withMessage("Title require mininal character."),
    body("text").isLength({min:25}).withMessage("Text require mininal character."),
], blogController.createBlog);

module.exports = router;
