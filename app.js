const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

app.use("/", require("./api"));

app.listen(8080, () => {
  console.log("Listening on port 8080.");
});

module.exports = app;
