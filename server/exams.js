const fs = require("fs");
const path = require("path");
const { cwd } = require("process");

class Exam {
  constructor() {}

  static getAll() {
    const exams = JSON.parse(
      fs.readFileSync(path.join(cwd(), "data", "data.json"), "utf-8")
    );

    return exams;
  }

  static getById(id) {
    const exams = JSON.parse(
      fs.readFileSync(path.join(cwd(), "data", "data.json"), "utf-8")
    );

    return exams.find((exam) => exam.id == id);
  }

  static add(exam) {
    const exams = JSON.parse(
      fs.readFileSync(path.join(cwd(), "data", "data.json"), "utf-8")
    );

    exam.id = exams.length + 1;

    exams.push(exam);

    fs.writeFileSync(
      path.join(cwd(), "data", "data.json"),
      JSON.stringify(exams, null, 2),
      "utf-8"
    );

    return exam;
  }

  static update(exam) {
    const exams = JSON.parse(
      fs.readFileSync(path.join(cwd(), "data", "data.json"), "utf-8")
    );

    const index = exams.findIndex((exam) => exam.id === exam.id);

    exams[index] = exam;

    fs.writeFileSync(
      path.join(cwd(), "data", "data.json"),
      JSON.stringify(exams, null, 2),
      "utf-8"
    );

    return exam;
  }

  static delete(id) {
    const exams = JSON.parse(
      fs.readFileSync(path.join(cwd(), "data", "data.json"), "utf-8")
    );

    const index = exams.findIndex((exam) => exam.id == id);

    exams.splice(index, 1);

    fs.writeFileSync(
      path.join(cwd(), "data", "data.json"),
      JSON.stringify(exams, null, 2),
      "utf-8"
    );

    return id;
  }
}

module.exports = Exam;
