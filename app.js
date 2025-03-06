require("dotenv").config();

const express = require("express"); //дістаємо експрес з package.json
const mongoose = require("mongoose");
const port = process.env.PORT;
const db_user = require("./models/User");
const db = require("./db"); //звертаємося до файлу бази даних, для екстракту масиву з об'єктами
const app = express(); //присвоюємо змінній виклик експрес
const array = db.users;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/views")); // папка для фронтенду
// app.use(
//   session({
//     secret: `${process.env.DB_USERNAME}`,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// '/' - дістати щось з початкової сторінки. req i res - отримання інфи з фронту і відправляння інфи на фронт

app.get("/", function (req, res) {
  return res.render("index.ejs"); // "/" - стартова сторінка серверу - http://localhost:3000,
});

app.get("/login", function (req, res) {
  return res.render("login.ejs");
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const age = req.body.age;
  const avatar = "";
  const job_title = req.body.job_title;
  const description = req.body.description;
  const gender = req.body.gender;
  const password = req.body.password;

  if (email === process.env.ADMIN && password === process.env.PASSWORD) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].email === email && array[i].password === password) {
        console.log("вже є такий адмін");
        return res.render("result.ejs", { array });
      }
    }
    let new_admin = { email: email, password: password };
    array.push(new_admin);
    return res.render("result.ejs", { array });
  } else {
    let new_person = {
      email: email,
      age: age,
      avatar: avatar,
      job_title: job_title,
      description: description,
      gender: gender,
      password: password,
    };
    for (let i = 0; i < array.length; i++) {
      if (array[i].email === new_person.email) {
        console.log("вже є такий користувач");
        return res.render("result.ejs", { array });
      }
    }
    array.push(new_person);
    array.forEach((user) => {
      user.password = user.password.toUpperCase();
    });
    return res.render("result.ejs", { array });
  }
});

app.post("/add", function (req, res) {
  const image = req.body.image;
  return res.render("repository.ejs", { image });
});

app.post("/deleted/:email", function (req, res) {
  const email = req.params.email;
  for (let i = 0; i < array.length; i++) {
    if (array[i].email === email) {
      array.splice(i, 1);
      return res.render("result.ejs", { array });
    }
  }
  console.log("Deleted user with email:", email);
  return res.render("result.ejs", { array });
});

app.post("/edited/:email", function (req, res) {
  const email = req.params.email;
  const newAvatar = req.body.new_avatar;

  for (let i = 0; i < array.length; i++) {
    if (array[i].email === email) {
      array[i].avatar = newAvatar;
      return res.render("result.ejs", { array });
    }
  }

  return res.render("result.ejs", { array });
});

app.post("/edit_pass/:password", function (req, res) {
  const password = req.params.password;
  const new_pass = req.body.new_password;
  const new_job_title = req.body.job_title;
  const correct_age = req.body.age;

  for (let i = 0; i < array.length; i++) {
    if (array[i].password === password) {
      array[i].password = new_pass;
      array[i].job_title = new_job_title;
      array[i].age = correct_age;
    }
  }

  return res.render("result.ejs", { array });
});

app.get("/user/:email", function (req, res) {
  const email = req.params.email;
  let user = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].email === email) {
      user = array[i];
    }
  }

  return res.render("user.ejs", { user });
});

app.get("/result", function (req, res) {
  return res.render("result.ejs", { array });
});

app.post("/change_description/:email", function (req, res) {
  const email = req.params.email;
  const new_description = req.body.changed_description;

  for (let i = 0; i < array.length; i++) {
    if (array[i].email === email) {
      array[i].description = new_description;
      return res.render("result.ejs", { array });
    }
  }

  return res.render("result.ejs", { array });
});

app.get("/add_new_user", function (req, res) {
  return res.render("new_user.ejs");
});

app.post("/add_new_user", async function (req, res) {
  const { email, age, avatar, job_title, description, gender, password } =
    req.body;

  const new_person = new db_user({
    email,
    age,
    avatar,
    job_title,
    description,
    gender,
    password,
  });

  await new_person.save();

  console.log(email);

  return res.redirect("/all_users");
});

app.get("/all_users", async function (req, res) {
  try {
    const users = await db_user.find();
    return res.render("all_users.ejs", { users });
  } catch (error) {
    console.error("Помилка отримання користувачів:", error);
    return res.status(500).send("Помилка сервера");
  }
});

// for (let i = 0; i < array.length; i++) {
//   console.log(array[i]);
// }
// console.log(db.users[0]); //db - заходимо в файл db.js, users - в масив і [0] вказуємо порядковий номер в масиві.

// app.listen(3000); // запуск сервера на порті

// console.log(
//   "щоб перейти на сервер клацніть по посиланню через ctrl + lbm http://localhost:3000"
// );

const start = async () => {
  await mongoose.connect(`${process.env.DB_URL}`);

  app.listen(port);

  console.log(
    `Сервер запущено на порту ${port}, клік на http://localhost:${port}`
  );
};

start();
