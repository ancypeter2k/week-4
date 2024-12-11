const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const router = require("./router");
const nocache = require("nocache");

const app = express();
const port = 5005;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Load static assets
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(nocache());

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening to the server on http://localhost:${port}`);
});
