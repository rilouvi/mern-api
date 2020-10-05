const {validationResult} = require("express-validator")
const Blog = require("../models/blog")

exports.createBlog = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const text = req.body.text;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error("Invalid input value")
        err.status = 400
        err.data = errors.array()
        throw err
        // return res.status(400).json({ errors: errors.array() });
    }

    const posting = new Blog({
        title : title,
        image : image,
        text : text,
        author : {
            uid: 21,
            name: "Rio",
        }
    })

    posting.save()
    .then(result => {
        const output = {
            message : "Create Blog Success",
            data : result
        }
    
        res.status(201).json(output);
        next()
    })
    .catch(err => {
        console.log("err : ", err)
    })
}