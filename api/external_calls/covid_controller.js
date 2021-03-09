const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  axios
    .get(
      `https://api.covidactnow.org/v2/state/NY.json?apiKey=${process.env.COVID}`
    )
    .then((data) => res.status(201).json(data.data))
    .catch((err) => res.status(500).send(err.message));
});

module.exports = router;
