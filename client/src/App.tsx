import { Route, Routes } from "react-router-dom";
import Exam from "./pages/exam/Exam";
import Exams from "./pages/exams/Exams";
import AddExam from "./pages/addExam/AddExam";
import { Container } from "reactstrap";

export default function App() {
  return (
    <>
      <Container>
        <Routes>
          {/* USER */}
          <Route path="/" element={<Exams user="USER" />} />
          <Route path="/:id" element={<Exam />} />

          {/* ADMIN */}
          <Route path="/exams" element={<Exams user="ADMIN" />} />
          <Route path="/exams/add" element={<AddExam target="add" />} />
          <Route
            path="/exams/update/:id"
            element={<AddExam target="update" />}
          />
        </Routes>
      </Container>
    </>
  );
}
