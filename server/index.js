const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const PORT = 3001;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "b99e0f1f43c905",
  host: "us-cdbr-east-03.cleardb.com",
  password: "3899e4c2",
  database: "heroku_f6e8b29e185a486",
});

////////////////////////// GET INFORMATION

app.post("/getInfo", (req, res) => {
  const tableName = req.body.tableName;
  db.query(`SELECT * FROM ${tableName}`, (err, result) => {
    if (err) {
      console.log(err);
      res.send([false]);
    } else {
      res.send(result);
    }
  });
});

///////////////////////// DELETE INFORMATION

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.data);
  console.log(req.body);
  const tableName = req.body.tableName;
  console.log(id, tableName);
  db.query(
    `DELETE FROM delivery_list WHERE ${tableName}_id = ${id}`,
    [tableName, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send([false, err.sqlMessage]);
      } else {
        console.log("done");
        res.send(true);
      }
    }
  );
});

//////////////////////////////// ADD ROW TO INFORMATION

app.put("/update/:id", (req, res) => {
  const id = req.params.id;

  const tableName = req.body.tableName;
  console.log(tableName);
  // db.query(`SELECT * FROM ${tableName}`, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(result);
  //   }
  // });
});

//
// mysql: app.post('/add/category', (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const country = req.body.country;
//   const position = req.body.position;
//   const wage = req.body.wage;
//
//   db.query(
//     'INSERT INTO employees (name, age, country, position, wage ) VALUES (?, ?, ?, ?, ?)',
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send('Values Inserted');
//       }
//     }
//   );
// });

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
