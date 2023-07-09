import React from "react";
import { Button, Col, Row } from "reactstrap";
import BaseInput from "../../components/BaseInput";
import { ExamI } from "./AddExam";
import Question from "./Question";
import { useFieldArray, useForm } from "react-hook-form";

interface ExamFormProps {
  target: "add" | "update";
  exam?: ExamI;
  onSave: (data: ExamI) => void;
}

export default function ExamFrom({ target, exam, onSave }: ExamFormProps) {
  const { control, handleSubmit } = useForm<ExamI>({
    defaultValues: exam,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
    shouldUnregister: true,
  });

  return (
    <>
      <form className="mt-3" onSubmit={handleSubmit(onSave)}>
        <Row className="mt-3">
          <Col lg={6} md={6} sm={12}>
            <BaseInput<ExamI> control={control} name="name" label="Exam Name" />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <BaseInput<ExamI>
              control={control}
              name="time"
              label="Exam Time"
              type="number"
              min={1}
              step={1}
            />
          </Col>

          <Col lg={12} md={12} sm={12}>
            <h3>Exam Questions</h3>
          </Col>

          {fields.map((field: any, index: number) => (
            <React.Fragment key={field.id}>
              <Col lg={11} md={11} sm={11} className="mt-3">
                <Question
                  control={control}
                  question={field}
                  index={index}
                  fields={fields}
                />
              </Col>

              <Col lg={1} md={1} sm={1} className="mt-3">
                <br />
                <Button
                  className="btn btn-danger btn-sm w-100 "
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </Col>
            </React.Fragment>
          ))}

          <Col lg={12} md={12} sm={12}>
            <Row className="d-flex justify-content-end">
              <Col lg={1} md={1} sm={1}>
                <Button
                  className="btn btn-warning btn-sm w-100"
                  onClick={(e) => {
                    e.preventDefault();

                    append({
                      text: "",
                      correctIndex: 0,
                      answers: [],
                    });
                  }}
                >
                  +
                </Button>
              </Col>
            </Row>
          </Col>

          <Col lg={12} md={12} sm={12} className="mt-3">
            <Button className="btn btn-success w-100" type="submit">
              {target === "update" ? "Update" : "Add"}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}
