import { useQuery } from "react-query";
import { deleteExam, getAllExams } from "../services";
import Loader from "../../components/Loader";
import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export interface ExamsProps {
  user: "USER" | "ADMIN";
}

export default function Exams({ user }: ExamsProps) {
  const { data, isLoading, refetch } = useQuery<any>(
    [`exams-${user}`],
    getAllExams,
    {
      cacheTime: 0,
    }
  );

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Exams</h1>

        {user === "ADMIN" && (
          <Link to="/exams/add">
            <Button className="btn btn-success">Create Exam</Button>
          </Link>
        )}
      </div>

      <Row className="mt-3">
        {data?.data?.map((exam: any) => (
          <Col key={exam.id} sm={12} md={6} lg={4}>
            <Card className="mb-3">
              <CardBody className="p-3">{exam.name}</CardBody>

              <CardFooter>
                <div className="d-flex" style={{ gap: "10px" }}>
                  {user === "ADMIN" && (
                    <>
                      <Link to={`/exams/update/${exam.id}`}>
                        <Button className="btn btn-warning">Edit</Button>
                      </Link>

                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          deleteExam(exam.id).then(() => {
                            toast.success("Exam deleted !");
                            refetch();
                          });
                        }}
                      >
                        <Button className="btn btn-danger">Delete</Button>
                      </Link>
                    </>
                  )}

                  <Link to={`/${exam.id}`}>
                    <Button className="btn btn-primary">Start</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
