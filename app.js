const express = require("express"); //дістаємо експрес з package.json
const app = express(); //присвоюємо змінній виклик експрес
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/views")); // папка для фронтенду

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// '/' - дістати щось з початкової сторінки. req i res - отримання інфи з фронту і відправляння інфи на фронт

app.get("/", function (req, res) {
  res.render("index.ejs"); // "/" - стартова сторінка серверу - http://localhost:3000,
});

app.get("/login", function (req, res) {
  res.render("login.ejs");
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  console.log(email);
  res.render("result.ejs", { email });
});

// app.post("/user", function (req, res) {
//   const user = req.body.user;
//   console.log(user);
//   res.render("result.ejs");
// });

app.listen(3000); // запуск сервера на порті 3000

console.log(
  "щоб перейти на сервер клацніть по посиланню через ctrl + лкм http://localhost:3000"
);
