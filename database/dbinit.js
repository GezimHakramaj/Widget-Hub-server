const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PW}@localhost:5432/${process.env.DB_NAME}`
);

const testDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the databse:", err);
  }
};

testDatabase();

db.sync({ alter: true });

module.exports = db;
