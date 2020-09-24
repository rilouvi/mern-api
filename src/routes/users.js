const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users")

router.post("/post", UsersController.Create);

router.get("/get", UsersController.GetAll);

module.exports = router;