const express = require("express");
const router = express.Router();
const { Tasks } = require("../../database/models");

router.get("/", (req, res, next) => {
  Tasks.findAll({
    where: {
      userId: req.session.user,
    },
  })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});

router.delete("/del", (req, res, next) => {
  Tasks.destroy({
    where: {
      userId: req.session.user,
    },
  }).catch((err) => res.json({ message: "Err", err }));
});

router.post("/edit", (req, res, next) => {
  req.body
    .map((task) => {
      Tasks.create({
        title: task.title,
        excerpt: task.excerpt,
        userId: req.session.user,
      }).catch((err) => res.json(err));
    })
    .then(() => res.json("Success"))
    .catch((err) => res.json(err));
});
module.exports = router;
