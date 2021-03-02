const express = require("express");
const router = express.Router();
const models = require("../../database/models");

router.get("/me", (req, res) => {
  res.json(req.session.user);
});

router.post("/login", (req, res, next) => {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
    include: [models.Preference, models.Tasks],
  })
    .then((user) => {
      if (!user) res.status(401).send("Email address not found.");
      else if (!user.correctPassword(req.body.password))
        res.status(401).json("Wrong password.");
      else {
        req.session.user = user;
        res.status(200).json(req.session.user);
      }
    })
    .catch((err) => next(err));
});

router.post("/signup", (req, res, next) => {
  models.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      models.Preference.create({
        userId: user.id,
      }).catch((err) => {
        res.status(401).json("Could not make preference.", err);
      });
      models.Tasks.create({
        userId: user.id,
      }).catch((err) => {
        res.status(401).json("Could not make tasks.", err);
      });
      res.json(user);
    })
    .catch((err) => {
      err.name === "SequelizeUniqueConstraintError"
        ? res.status(401).json("Email already in use")
        : next(err);
    });
});

router.delete("/logout", (req, res, next) => {
  req.session.user = null;
  res.send("Successfuly logged out.");
});

router.put("/edit", (req, res, next) => {
  models.Preference.findByPk(1)
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
