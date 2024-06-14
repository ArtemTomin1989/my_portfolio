const express = require("express"); //дістаємо експрес з package.json
const app = express(); //присвоюємо змінній виклик експрес
require("dotenv").config();

app.use(express.static(__dirname + "/views"));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// '/' - дістати щось з початкової сторінки. req i res - отримання інфи з фронту і відправляння інфи на фронт

app.get("/hello", function (req, res) {
  res.send("hello piska");
}); // інша сторінка серверу http://localhost:3000/hello/ // res.send - відправка повідомлення на сервер.

app.get("/", function (req, res) {
  res.render("index"); // "/" - стартова сторінка серверу - http://localhost:3000,
});

app.get("/shliah", function (req, res) {
  res.render("login");
});

app.listen(3000); // запуск сервера на порті 3000
