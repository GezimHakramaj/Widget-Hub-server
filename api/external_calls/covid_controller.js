const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    const result = await axios.get(`${process.env.COVID}`);
    const {
      positiveIncrease,
      totalTestResultsIncrease,
      negativeIncrease,
    } = result.data;
    res.status(200).json({
      dailyPositive: positiveIncrease,
      dailyNegative: negativeIncrease,
      dailyTests: totalTestResultsIncrease,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
