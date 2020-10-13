const {validationResult} = require("express-validator")
const Blog = require("../models/blog")

exports.createBlog = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error("Invalid input value")
        err.status = 400
        err.data = errors.array()
        throw err
        // return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
        const err = new Error("Image must be uploaded")
        err.status = 422
        throw err
    }

    const title = req.body.title;
    const image = req.file.path;
    const text = req.body.text;

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

exports.getAllBlog = (req, res, next) => {
    Blog.find()
    .then(result => {
        const output = {
            message : "Data Blog Success",
            data : result
        }
    
        res.status(201).json(output);
        next()
    })
    .catch(err => {
        console.log("err : ", err)
        next(err)
    })
}

exports.getBlogById = (req, res, next) => {
    const id = req.params.id
    Blog.findById(id)
    .then(result => {
        if (!result) {
            const err = new Error("Data Not Found")
            err.status = 404
            err.data = errors.array()
            throw err
        }
        const output = {
            message : "Data Blog Success",
            data : result
        }
    
        res.status(201).json(output);
        next()
    })
    .catch(err => {
        console.log("err : ", err)
        next(err)
    })
}