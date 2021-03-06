const router = require("express").Router();
require("dotenv").config();

router.use("/", require("./user_controller"));
router.use("/prefs", require("./prefs_controller"));
router.use("/tasks", require("./tasks_controller"));

module.exports = router;
