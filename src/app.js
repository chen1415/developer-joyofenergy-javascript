const express = require("express");
const { readings } = require("./readings/readings");
const { readingsData } = require("./readings/readings.data");
const { read, store } = require("./readings/readings-controller");
const { recommend, compare } = require("./price-plans/price-plans-controller");
const knex = require("knex")(require("../knexfile").development);
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

const { getReadings, setReadings } = readings(readingsData);

app.get("/readings/read/:smartMeterId", (req, res) => {
  res.send(read(getReadings, req));
});

app.post("/readings/store", (req, res) => {
  res.send(store(setReadings, req));
});

app.get("/price-plans/recommend/:smartMeterId", (req, res) => {
  res.send(recommend(getReadings, req));
});

app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {
  res.send(compare(getReadings, req));
});

//below for test purpose
// Create a new user
app.post("/users", (req, res) => {
  knex("users")
    .insert({
      name: req.body.name,
      email: req.body.email,
    })
    .then(() => res.status(201).send("User added"))
    .catch((error) => res.status(500).send(error));
});

// Get all users
app.get("/users", (req, res) => {
  knex("users")
    .select()
    .then((users) => res.send(users));
});

// Update an existing user
app.put("/users/:id", (req, res) => {
  knex("users")
    .where("id", req.params.id)
    .update({
      name: req.body.name,
      email: req.body.email,
    })
    .then(() => res.send("User updated"))
    .catch((error) => res.status(500).send(error));
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  knex("users")
    .where("id", req.params.id)
    .del()
    .then(() => res.send("User deleted"))
    .catch((error) => res.status(500).send(error));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
