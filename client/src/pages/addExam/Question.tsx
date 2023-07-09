import { QuestionI } from "./AddExam";
import { Col, Row } from "reactstrap";
import BaseInput from "../../components/BaseInput";

interface QuestionProps {
  question: QuestionI;
  fields: QuestionI[];
  index: number;
  control: any;
}

export default function Question({
  control,
  question,
  index,
  fields,
}: QuestionProps) {
  return (
    <>
      <BaseInput<QuestionI>
        control={control}
        name="id"
        type="hidden"
        defaultValue={index + 1}
      />

      <Row className={index === fields.length - 1 ? "" : "mb-3"}>
        <Col lg={10} md={10} sm={10}>
          <BaseInput
            control={control}
            name={`questions.${index}.text`}
            label={"Question " + (index + 1)}
            defaultValue={question.text}
          />
        </Col>

        <Col lg={2} md={2} sm={2}>
          <BaseInput
            control={control}
            name={`questions.${index}.correctIndex`}
            label={"Correct Answer"}
            defaultValue={question.correctIndex}
            type="select"
          >
            <option value={0} selected={question.correctIndex === 0}>
              A
            </option>
            <option value={1} selected={question.correctIndex === 1}>
              B
            </option>
            <option value={2} selected={question.correctIndex === 2}>
              C
            </option>
            <option value={3} selected={question.correctIndex === 3}>
              D
            </option>
          </BaseInput>
        </Col>

        <Col lg={3} md={3} sm={3}>
          <BaseInput
            control={control}
            name={`questions.${index}.answers.0.text`}
            label={"Answer A"}
          />
        </Col>

        <Col lg={3} md={3} sm={3}>
          <BaseInput
            control={control}
            name={`questions.${index}.answers.1.text`}
            label={"Answer B"}
          />
        </Col>

        <Col lg={3} md={3} sm={3}>
          <BaseInput
            control={control}
            name={`questions.${index}.answers.2.text`}
            label={"Answer C"}
          />
        </Col>

        <Col lg={3} md={3} sm={3}>
          <BaseInput
            control={control}
            name={`questions.${index}.answers.3.text`}
            label={"Answer D"}
          />
        </Col>
      </Row>
    </>
  );
}
