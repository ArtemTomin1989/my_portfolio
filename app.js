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
  res.render("index"); // "/" - стартова сторінка серверу - http://localhost:3000,
});

app.listen(3000); // запуск сервера на порті 3000
