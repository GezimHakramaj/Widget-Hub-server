const Sequelize = require("sequelize");
const db = require("../dbinit");

const Tasks = db.define("tasks", {
  task: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Tasks;
