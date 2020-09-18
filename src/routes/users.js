const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users")

router.post("/users", UsersController.Create);

router.get("/users", UsersController.GetAll);

module.exports = router;