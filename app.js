const express = require("express"); //дістаємо експрес з package.json
const app = express(); //присвоюємо змінній виклик експрес
require("dotenv").config();

app.use(express.static(__dirname + "/views")); // папка для фронтенду

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

app.get("/users-stro4ka", function (req, res) {
  let user = "kaka";
  let surname = "b";

  let admin_name = process.env.ADMIN;
  let admin_surname = process.env.SECOND_NAME;

  if (user === admin_name && surname === admin_surname) {
    res.render("users", { admin_name, admin_surname });
  } else {
    res.render("users", { admin_name: "", admin_surname: "" });
  }
});
app.listen(3000); // запуск сервера на порті 3000
