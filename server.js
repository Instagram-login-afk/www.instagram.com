const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
  const username = req.body.username;

  console.log("Received username:", username);

  res.send({ message: "Success" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});