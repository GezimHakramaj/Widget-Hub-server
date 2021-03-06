const express = require("express");
const router = express.Router();
const { Preference } = require("../../database/models");

router.put("/edit", (req, res, next) => {
  const { id } = req.session.user;
  Preference.findByPk(id)
    .then((prefs) => {
      prefs.update({
        clock: req.body.clock,
        toDoList: req.body.toDoList,
        weather: req.body.weather,
        news: req.body.news,
        covid: req.body.covid,
      });
      prefs.save();
      req.session.user.pref = prefs;
      res.status(200).json({
        message: "Success",
        prefs,
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
