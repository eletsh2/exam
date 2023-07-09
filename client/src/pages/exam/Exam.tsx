import Loader from "../../components/Loader";
import { Button, Col, Row } from "reactstrap";
import ExamQuestion from "./ExamQuestion";
import { QuestionI } from "../addExam/AddExam";
import { useExam } from "./useExam";
import { useScore } from "./useScore";
import { Timer } from "../../hooks/useTimer";
import { useEffect, useMemo, useState } from "react";

export default function Exam() {
  const { exam, isLoading } = useExam();
  const { score, setScore, setShowAnswers, showAnswers } = useScore();

  const [time, setTime] = useState("");

  const timer = useMemo(
    () =>
      new Timer({
        endDate: new Date(
          new Date().getTime() + 60 * 1000 * exam?.time
        ).toJSON(),
        onTick(obj) {
          setTime(`${obj.hours}:${obj.minutes}:${obj.seconds}`);
        },
        onFinished: () => {
          setShowAnswers(true);
        },
      }),
    [exam?.time]
  );

  useEffect(() => {
    timer.start();

    return () => {
      timer.stop();
    };
  }, [timer]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>{exam?.name}</h1>

        {showAnswers ? (
          <h3 className="bg-success p-2 text-white">
            {score} / {exam?.questions.length}
          </h3>
        ) : (
          time
        )}
      </div>

      <Row className="mt-5">
        {exam?.questions.map((question: QuestionI) => (
          <ExamQuestion
            question={question}
            key={"question" + question.id}
            setScore={setScore}
            showAnswers={showAnswers}
          />
        ))}
      </Row>

      <Row>
        <Col>
          <Button
            onClick={() =>
              setShowAnswers((showAnswers) => {
                if (showAnswers) {
                  setScore(0);
                  timer.start();
                } else {
                  timer.stop();
                }

                return !showAnswers;
              })
            }
          >
            {showAnswers ? "Start Exam" : "Finish Exam"}
          </Button>
        </Col>
      </Row>
    </>
  );
}
