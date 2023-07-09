import { Spinner } from "reactstrap";

export default function Loader() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", gap: "10px" }}
      >
        <Spinner animation="border" />
        loading
      </div>
    </>
  );
}
