const express = require("express"); //дістаємо експрес з package.json
const db = require("./db"); //звертаємося до файлу бази даних, для екстракту масиву з об'єктами
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

// app.post("/login", function (req, res) {
//   const email = req.body.email;
//   const password = req.body.password;
//   const array = db.users;

//   if (email === process.env.ADMIN && password === process.env.PASSWORD) {
//     console.log("hello admin");
//   } else {
//     let new_person = { name: email, password: password };
//     array.push(new_person);
//     console.log(array);
//   }
//   res.render("result.ejs", { email, password });
// });

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const array = db.users;

  if (email === process.env.ADMIN && password === process.env.PASSWORD) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === email && array[i].password === password) {
        console.log("вже є такий користувач");
      }
    }
    let new_admin = { name: email, password: password };
    array.push(new_admin);
    console.log("новий юзер -  адмін", array);
  } else {
    let new_person = { name: email, password: password };
    array.push(new_person);
    console.log(array);
  }
  res.render("result.ejs", { email, password });
});

app.post("/add", function (req, res) {
  const image = req.body.image;
  res.render("repository.ejs", { image });
});

// for (let i = 0; i < array.length; i++) {
//   console.log(array[i]);
// }
// console.log(db.users[0]); //db - заходимо в файл db.js, users - в масив і [0] вказуємо порядковий номер в масиві.

app.listen(3000); // запуск сервера на порті 3000

console.log(
  "щоб перейти на сервер клацніть по посиланню через ctrl + лкм http://localhost:3000"
);
