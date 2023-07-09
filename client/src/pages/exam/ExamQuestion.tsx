import React from "react";
import { AnswerI, QuestionI } from "../addExam/AddExam";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

interface ExamQuestionProps {
  question: QuestionI;
  showAnswers: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function ExamQuestion({
  question,
  setScore,
  showAnswers,
}: ExamQuestionProps) {
  const [userAnswer, setUserAnswer] = React.useState<number | null>(null);

  return (
    <>
      <Col lg={6} md={6} sm={12} key={question.id} className="mb-4">
        <Card>
          <CardHeader>{question.text}</CardHeader>

          <CardBody>
            <Row>
              {question.answers.map((answer: AnswerI, index: number) => (
                <Col
                  key={answer.id}
                  className={`my-1 p-1 answer ${
                    index === userAnswer ||
                    (showAnswers && index === +question.correctIndex)
                      ? "selected"
                      : ""
                  } ${
                    showAnswers &&
                    userAnswer === index &&
                    index === +question.correctIndex
                      ? "correct"
                      : ""
                  } ${
                    showAnswers &&
                    userAnswer === index &&
                    index !== +question.correctIndex
                      ? "wrong"
                      : ""
                  }`}
                  onClick={
                    showAnswers
                      ? undefined
                      : () => {
                          if (
                            index === +question.correctIndex &&
                            userAnswer !== +question.correctIndex
                          )
                            setScore((score) => score + 1);

                          if (
                            userAnswer === +question.correctIndex &&
                            index !== +question.correctIndex
                          )
                            setScore((score) => score - 1);

                          setUserAnswer(index);
                        }
                  }
                >
                  {answer.text}
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
