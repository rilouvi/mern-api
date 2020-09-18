exports.Create = (req, res, next) => {
    // console.log("method : ", req.method)
    // console.log("url : ", req.originalUrl)
    const params = req.body

    res.json(
        {
            message : "Set New User",
            data : {
                "name" : params.name,
                "email" : params.email
            }
        }
    )
    next()
}

exports.GetAll = (req, res, next) => {
    res.json(
        {
            message : "Get Users",
            data : {
                "name" : "Rekan Alam",
                "email" : "rekanalam@gmail.com"
            }
        }
    )
    next()
};