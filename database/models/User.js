const Sequelize = require("sequelize");
const db = require("../dbinit");
const crypto = require("crypto");

const User = db.define("user", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 20],
    },
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
});

User.generateSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

//creating an encrypted password
User.encryptPassword = (plaintext, salt) => {
  return crypto
    .createHash("RSA-SHA256")
    .update(plaintext)
    .update(salt)
    .digest("hex");
};

const setSaltandPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.prototype.correctPassword = function (candidatepw) {
  return User.encryptPassword(candidatepw, this.salt()) === this.password();
};

User.beforeCreate(setSaltandPassword);
User.beforeUpdate(setSaltandPassword);

module.exports = User;
