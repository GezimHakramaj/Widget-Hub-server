const Sequelize = require("sequelize");
const db = require("../dbinit");

const Tasks = db.define("tasks", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  excerpt: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Tasks.seedTasks = function (userId) {
  Tasks.bulkCreate([
    {
      title: "Jog",
      excerpt: "Going jogging at 1",
      userId: userId,
    },
    {
      title: "Walk dog",
      excerpt: "Walking the dog at 2",
      userId: userId,
    },
    {
      title: "Studying",
      excerpt: "Study from 3-4",
      userId: userId,
    },
    {
      title: "Gym",
      excerpt: "Head to the gym at 5",
      userId: userId,
    },
    {
      title: "Code",
      excerpt: "Work on coding projects.",
      userId: userId,
    },
  ]);
};

module.exports = Tasks;
