import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateClaimComponent = ({ insurances, user, createClaim }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(false);

    const form = event.currentTarget.elements;
    console.log("form", form);
    console.log(form.followUp.value);
    console.log(form.insuranceId.value);

    const enteredDate = new Date(form.expenseDate.value);
    const startDate = new Date(selectedInsurance.PolicyStartDate);
    const endDate = new Date(selectedInsurance.PolicyEndDate);
    console.log(enteredDate, startDate, endDate);

    if (enteredDate < startDate || enteredDate > endDate) {
      // Date is not within the coverage period
      setAlertMessage(
        "Expense date is not within coverage period of insurance"
      );
      setShowAlert(true);
      return;
    }

    if (form.amount.value > selectedInsurance.RemainingClaimLimit) {
      setAlertMessage("Amount claimed exceeds remaining clam limit insurance");
      setShowAlert(true);
      return;
    }

    const formInputs = {
      FirstName: form.firstName.value,
      LastName: form.lastName.value,
      ExpenseDate: form.expenseDate.value,
      Amount: form.amount.value,
      Purpose: form.purpose.value,
      FollowUp: Number(form.followUp.value),
      InsuranceID: form.insuranceId.value,
      EmployeeID: user.EmployeeID,
    };
    console.log("form input", formInputs);

    if (event.currentTarget.checkValidity() === true) {
      createClaim(formInputs)
        .then((res) => {
          console.log(res);
          setSuccess(true);
        })
        .catch((er) => console.log(er));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={2}>
          <Link to="/dashboard" className="btn btn-primary my-3">
            Go Back
          </Link>
        </Col>
        <Col md={9}>
          <h1>Create New Claim</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                required
                type="text"
                maxLength="50"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                maxLength="50"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control
                name="expenseDate"
                required
                type="date"
                maxLength="255"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control name="amount" required type="number" step="0.01" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Purpose</Form.Label>
              <Form.Control
                name="purpose"
                required
                type="text"
                maxLength="255"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Follow Up Required?</Form.Label>
              <Form.Select
                name="followUp"
                aria-label="Default select example"
                required
              >
                <option value=""></option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Insurance Policy </Form.Label>
              <Table className="mt-1" striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Insurance ID</th>
                    <th>Insurance Type</th>
                    <th>Coverage Period</th>
                    <th>Claim Limit</th>
                    <th>Remaining Claim Limit</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {insurances?.map((insurance, idx) => (
                    <tr key={idx}>
                      <td>{insurance.InsuranceID}</td>
                      <td>{insurance.InsuranceType}</td>
                      <td>
                        {insurance.PolicyStartDate} to {insurance.PolicyEndDate}
                      </td>
                      <td>{insurance.ClaimLimit}</td>
                      <td>{insurance.RemainingClaimLimit}</td>
                      <td>
                        <Form.Check
                          type="radio"
                          name="insuranceId"
                          value={insurance.InsuranceID}
                          onChange={() => setSelectedInsurance(insurance)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Group>
            <Row>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Row>
            <Alert variant="danger" className="mt-3" show={showAlert}>
              {alertMessage}
            </Alert>
            <Alert variant="success" className="mt-3" show={success}>
              Successfully created claim
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateClaimComponent;
