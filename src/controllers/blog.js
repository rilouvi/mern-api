const {validationResult} = require("express-validator")
const Blog = require("../models/blog")
const path = require("path")
const fs = require("fs")

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
    const page =  parseInt(req.query.page || 1)
    const per_page =  parseInt(req.query.per_page || 5)
    let total
    
    Blog.find().countDocuments()
    .then(count => {
        total = count
        return Blog.find().skip((page-1) * per_page).limit(per_page)
    })
    .then(result => {
        const output = {
            message : "Data Blog Success",
            data : result,
            meta : {
                total : total,
                page : page,
                per_page : per_page
            }
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

exports.updateBlogById = (req, res, next) => {
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
    
    const id = req.params.id

    Blog.findById(id)
    .then(post => {
        if (!post) {
            const err = new Error("Data Not Found")
            err.status = 404
            err.data = errors.array()
            throw err
        }

        post.title = title,
        post.image = image,
        post.text = text,
        post.author = {
            uid: 21,
            name: "Rio",
        }

        return post.save()
    })
    .then(result => {
        const output = {
            message : "Update Blog Success",
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

exports.deleteBlogById = (req, res, next) => {
    const id = req.params.id
    Blog.findById(id)
    .then(post => {
        if (!post) {
            const err = new Error("Data Not Found")
            err.status = 404
            err.data = errors.array()
            throw err
        }

        let filePath = post.image
        removeImage(filePath)

        return Blog.findByIdAndRemove(id)
    })
    .then(result => {
        const output = {
            message : "Delete Blog Success",
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

const removeImage = (filePath) => {
    filePath = path.join(__dirname, "../../", filePath)
    fs.unlink(filePath, err => console.log(err))
}
