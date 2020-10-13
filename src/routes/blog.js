const express = require("express");
const router = express.Router();
const {body} = require("express-validator")

const blogController = require("../controllers/blog")

router.post("/post", [
    body("title").isLength({min:10}).withMessage("Title require mininal character."),
    body("text").isLength({min:25}).withMessage("Text require mininal character."),
], blogController.createBlog);

router.get("/posts", blogController.getAllBlog)
router.get("/post/:id", blogController.getBlogById)
router.put("/post/:id", [
    body("title").isLength({min:10}).withMessage("Title require mininal character."),
    body("text").isLength({min:25}).withMessage("Text require mininal character."),
], blogController.updateBlogById)
router.delete("/post/:id", blogController.deleteBlogById)

module.exports = router;
