exports.createBlog = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const text = req.body.text;

    const result = {
        message : "Create Blog Success",
        data : {
            uid : 1,
            title : title,
            image : image,
            text : text,
        }
    }

    res.status(201).json(result);
    next()
}