const express = require("express");
const router = express.Router();
const { Tasks } = require("../../database/models");

router.put("/edit", (req, res, next) => {
  Tasks.sequelize
    .transaction(function (t) {
      let promises = [];
      req.body.map((task) => {
        newPromise = Tasks.findByPk(task.id, { transaction: t });
        promises.push(newPromise);
      });
      return Promise.all(promises);
    })
    .then((tasks) => res.status(200).json({ message: "Success", tasks }))
    .catch((err) => res.status(500).json(err.message));
});

module.exports = router;
