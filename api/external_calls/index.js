const router = require("express").Router();

router.use("/covid", require("./covid_controller"));
router.use("/news", require("./news_controller"));
router.use("/weather", require("./weather_controller"));

module.exports = router;
