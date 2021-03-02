const Sequelize = require("sequelize");
const db = require("../dbinit");

const Preference = db.define("prefs", {
  clock: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  toDoList: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  weather: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  news: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  covid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Preference;
