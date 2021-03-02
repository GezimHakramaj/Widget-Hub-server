const express = require("express");
const router = express.Router();
const { Preference } = require("../../database/models");

router.put("/:id", (req, res, next) => {
  Preference.findByPk(1)
    .then((pref) => {
      pref.update({
        clock: req.body.clock,
        toDoList: req.body.toDoList,
        weather: req.body.weather,
        news: req.body.news,
        covid: req.body.covid,
      });
      pref.save();
      res.status(200).json({
        message: "Success",
        pref,
        data: req.session.user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error",
        err,
      });
    });
});

module.exports = router;
