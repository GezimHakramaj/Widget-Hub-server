const router = require("express").Router();
require("dotenv").config();

router.use("/", require("./user_controller"));
router.use("/user", require("./prefs_controller"));

module.exports = router;
