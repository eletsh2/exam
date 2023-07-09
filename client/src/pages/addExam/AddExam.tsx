import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { createExam, updateExam } from "../services";
import { toast } from "react-toastify";
import ExamFrom from "./ExamFrom";
import { useAddExam } from "./useAddExam";

export interface AddExamProps {
  target: "add" | "update";
}

export interface AnswerI {
  id?: number;
  text: string;
}

export interface QuestionI {
  id?: number;
  text: string;
  correctIndex: number;
  answers: AnswerI[];
}

export interface ExamI {
  id?: number;
  name: string;
  time: string;
  questions: QuestionI[];
}

export default function AddExam({ target }: AddExamProps) {
  const navigate = useNavigate();

  const { exam, isLoading } = useAddExam({
    target,
  });

  if (isLoading) return <Loader />;

  const onSave = (data: ExamI) => {
    if (target === "update")
      return updateExam(exam?.id || "", { ...data, id: exam.id }).then(() => {
        toast.success("Updated !");
        navigate("/exams");
      });

    if (target === "add")
      return createExam(data).then(() => {
        toast.success("Added !");
        navigate("/exams");
      });
  };

  return (
    <>
      <h1>{target === "update" ? "Update Exam" : "Add Exam"}</h1>

      <ExamFrom target={target} onSave={onSave} exam={exam} />
    </>
  );
}
