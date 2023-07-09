const router = require("express").Router();
const Exam = require("../exams");

router.get("/", (req, res) => {
  res.json(Exam.getAll());
});

router.get("/:id", (req, res) => {
  res.json(Exam.getById(req.params.id));
});

router.post("/", (req, res) => {
  res.json(Exam.add(req.body));
});

router.put("/:id", (req, res) => {
  res.json(Exam.update(req.body));
});

router.delete("/:id", (req, res) => {
  res.json(Exam.delete(req.params.id));
});

module.exports = router;
