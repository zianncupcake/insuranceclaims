import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "../context/UserContext";

const LoginComponent = ({ loginUser }) => {
  const { login } = useAuth();
  const [validated, setValidated] = useState(false);
//   const [incompleteAlert, setincompleteAlert] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    //gets all form elements. e;ements is property of the form element that returns a collection of all form controls within the form
    const form = event.currentTarget.elements;
    console.log("form", form);

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const password = form.password.value;

    if (event.currentTarget.checkValidity() === true) {
        console.log("firstName", firstName)
        console.log("lastName", lastName)
        console.log("password", password)

      loginUser(firstName, lastName, password)
        .then((res) => {
          console.log("res", res);
            login(res.user[0]);
            navigate("/dashboard");
          
        })
        .catch((er) => {
            setErrorMessage(er.response.data)
            setErrorAlert(true)
        });
    } 
    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                required
                type="text"
                placeholder="Enter first name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                placeholder="Enter last name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Row>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Row>
            <br></br>
            <Row>
              <Alert show={errorAlert} variant="danger" className="text-center" >
                {errorMessage}
              </Alert>
            </Row>
            {/* <Row>
              <Alert show={incompleteAlert} variant="danger">
                Please input all fields
              </Alert>
            </Row> */}

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
