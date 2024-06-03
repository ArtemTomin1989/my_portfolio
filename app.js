const express = require("express"); //дістаємо експрес з package.json
const app = express(); //присвоюємо змінній виклик експрес

// '/' - дістати щось з початкової сторінки. req i res - отримання інфи з фронту і відправляння інфи на фронт
app.get("/", function (req, res) {
  res.send("HEllo");
});

app.listen(3000); // запуск сервера на порті 3000

console.log("сервер запущено");
