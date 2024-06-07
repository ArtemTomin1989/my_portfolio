const express = require("express"); //дістаємо експрес з package.json
const app = express(); //присвоюємо змінній виклик експрес
require("dotenv").config();
const name = process.env.NAME;
const age = process.env.AGE;
const password = process.env.PASSWORD;
console.log(name, age, password);

// '/' - дістати щось з початкової сторінки. req i res - отримання інфи з фронту і відправляння інфи на фронт
app.get("/", function (req, res) {
  res.send(`Користувач ${name} має ${age} років і пароль - ${password}`);
});

app.listen(3000); // запуск сервера на порті 3000

console.log("сервер запущено");
