const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todolist",
});
app.get("/", (re, res) => {
  return res.json("From backend side");
});

app.post("/addlist", (req, res) => {
  const data = req.body;
  console.log(data);
  //const data = { name: req.body.Name, description: req.body.Description };
  const sql = `INSERT INTO addlist SET (?)`;
  db.query("INSERT INTO addlist SET ?", data, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// app.post("/addlist", (req, res) => {
//   //const id = req.body.id;
//   const Name = req.body.Name;
//   const Description = req.body.Description;
//   const sql = "INSERT INTO addlist VALUES (?,?)";
//   db.query(sql, [Name, Description], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

app.get("/addlist", (req, res) => {
  const sql = "SELECT * FROM addlist";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/deletelist", (req, res) => {
  const delid = req.body.id;
  const sql = "DELETE FROM addlist WHERE id=?";
  db.query(sql, delid, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.listen(8081, () => {
  console.log("listening");
});
