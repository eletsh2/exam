const express = require("express");
const app = express();
const Exam = require("./exams.js");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());

app.use("/exams", require("./routes/exams.routes.js"));

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
