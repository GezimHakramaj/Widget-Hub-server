const db = require("../dbinit");
const User = require("./User");
const Tasks = require("./Tasks");
const Preference = require("./Preference");

User.hasOne(Preference);
User.hasMany(Tasks);
Tasks.belongsTo(User);
Preference.belongsTo(User);

module.exports = {
  User,
  Preference,
  Tasks,
};
