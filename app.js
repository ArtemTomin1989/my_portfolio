const express = require("express"); //дістаємо експрес з package.json
const app = express(); //присвоюємо змінній виклик експрес
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get("/welcome", function (req, res) {
  let result = "";
  let admin_name = process.env.ADMIN;
  let admin_surname = process.env.SECOND_NAME;

  if (admin_name.length > 4 && admin_surname.length > 4) {
    result = `${admin_name}, ${admin_surname}`;
  } else {
    result = "data is incorrect";
  }

  res.render("welcome", { result });
});

app.get("/names", function (req, res) {
  let people = ["kohn", "bill", "kasandra", "elizabetic"];
  let new_arr = people.filter((element) => element.length > 4);
  res.render("names", { new_arr });
});
app.post("/login", function (req, res) {
  let password = req.body.password;
  let login = req.body.login;
  let result = "";
  let photo = req.body.photo;
  console.log(password, login, photo);
  if (login.length < 6 && password.length < 6) {
    result = "дані закороткі";
  } else {
    result = `ваш логін ${login} і ваш пароль ${password}`;
  }

  if (photo.length < 1) {
    photo =
      "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp";
  }

  return res.render("welcome", { result, photo });
});

app.listen(3000); // запуск сервера на порті 3000
