import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminEditClaimComponent = ({ getClaim, getInsurance, updateClaim, claimid }) => {
//   console.log("claim", claim);
//   console.log("insurance", insurance);
const [insurance, setInsurance] = useState({});
const [claim, setClaim] = useState({});

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  //   const [selectedInsurance, setSelectedInsurance] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getClaim(claimid)
    .then(res => {
        setClaim(res[0])
        console.log("res[0]", res[0])

        getInsurance(res[0].InsuranceID)
        .then(res2 => {
            setInsurance(res2[0])
            console.log("res2[0]", res2[0])

        })
        .catch(er => console.log(er))
    
    })
    .catch((er) => console.log(er));
 },[insurance, claim])


  const getStatusColorClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success";
      case "Pending":
        return "bg-warning";
      case "Rejected":
        return "bg-danger";
      default:
        return "";
    }
  };
  const getRemainingClass = (remainingClaimLimit, claimLimit) => {
    const percentage = (remainingClaimLimit / claimLimit) * 100;

    if (percentage >= 75) {
      return "bg-success";
    } else if (percentage < 75 && percentage >= 25) {
      return "bg-warning";
    } else {
      return "bg-danger";
    }
  };

  const handleAccept = async () => {
    const remaining = insurance.RemainingClaimLimit - claim.Amount
    const formInputs = {
        status:"Approved",
        remainingClaimLimit: remaining
    }
    console.log("formInputs", formInputs)
    if (window.confirm("Are you sure?")) {    
        try {
            const res = await updateClaim(claim.ClaimID, insurance.InsuranceID, formInputs)
            console.log(res)
            setSuccess(true)

        } catch (er) {
            console.log(er)
        }

  }
}

const handleReject = async () => {
    const remaining = insurance.RemainingClaimLimit
    const formInputs = {
        status:"Rejected",
        remainingClaimLimit: remaining
    }
    console.log("formInputs", formInputs)
    if (window.confirm("Are you sure?")) {    
        try {
            const res = await updateClaim(claim.ClaimID, insurance.InsuranceID, formInputs)
            console.log(res)
            setSuccess(true)

        } catch (er) {
            console.log(er)
        }

  }
}


  //   useEffect(() => {
  //     if (claim?.InsuranceID) {

  //       const foundInsurance = insurances.find(insurance => insurance.InsuranceID === claim.InsuranceID);
  //       setSelectedInsurance(foundInsurance);
  //     }
  //   }, [claim]);

  //   const handleSubmit = (event) => {
  //       event.preventDefault();
  //       setShowAlert(false);
  //       setAlertMessage("");
  //       const form = event.currentTarget.elements;
  //       const formInputs = {
  //           FirstName: form.firstName.value,
  //           LastName: form.lastName.value,
  //           ExpenseDate: form.expenseDate.value,
  //           Amount: form.amount.value,
  //           Purpose: form.purpose.value,
  //           FollowUp: Number(form.followUp.value),
  //           InsuranceID: form.insurancePolicy.value,
  //         };
  //         console.log("form input", formInputs);

  //       console.log(form.insurancePolicy.value)

  //       const foundInsurance = insurances.find(insurance => form.insurancePolicy.value == insurance.InsuranceID);
  //       console.log(foundInsurance)

  //       const enteredDate = new Date(formInputs.ExpenseDate);
  //       const startDate = new Date(foundInsurance.PolicyStartDate);
  //       const endDate = new Date(foundInsurance.PolicyEndDate);
  //       console.log(enteredDate, startDate, endDate);

  //       if (enteredDate < startDate || enteredDate > endDate) {
  //         // Date is not within the coverage period
  //         setAlertMessage(
  //           "Expense date is not within coverage period of insurance"
  //         );
  //         setShowAlert(true);
  //         return;
  //       }
  //       if (form.amount.value > foundInsurance.RemainingClaimLimit) {
  //           setAlertMessage("Amount claimed exceeds remaining clam limit insurance");
  //           setShowAlert(true);
  //           return;
  //         }

  //       if (event.currentTarget.checkValidity() === true) {
  //           editClaim(claim.ClaimID, formInputs)
  //           .then(res => {
  //               console.log(res);
  //               setSuccess(true)
  //           })
  //           .catch((er) => console.log(er))
  //       }

  //   }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col md={2}>
          <Link to="/admin" className="btn btn-primary my-3">
            Go Back
          </Link>
        </Col>
        <Col md={9}>
          {/* <Row>
              <Alert variant="warning" className="mt-3" >
                  Last edited on {claim.LastEditedClaimDate}
                </Alert>
  
              </Row> */}

          <h1>Claim {claim.ClaimID}</h1>

          <div className="mb-3 mt-3">
            <p>
              <strong>First Name:</strong> {claim.FirstName}
            </p>
            <p>
              <strong>Last Name:</strong> {claim.LastName}
            </p>
            <p>
              <strong>Expense Date:</strong> {claim.ExpenseDate}
            </p>
            <p>
              <strong>Amount:</strong> {claim.Amount}
            </p>
            <p>
              <strong>Purpose:</strong> {claim.Purpose}
            </p>

            <p>
              <strong>Follow Up Required:</strong>{" "}
              {claim.FollowUp === "1" ? "Yes" : "No"}
            </p>
            <p>
              <strong>Status:</strong>
              <Badge
                style={{ fontSize: "0.9rem", marginLeft: "10px" }}
                className={getStatusColorClass(claim.Status)}
              >
                {claim.Status}
              </Badge>
            </p>
          </div>
          <div className="mb-3">
            <p>
              <strong>Insurance Policy Selected: </strong>
            </p>
            {insurance && (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Insurance ID</th>
                    <th>Insurance Type</th>
                    <th>Coverage Period</th>
                    <th>Claim Limit</th>
                    <th>Remaining Claim Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{insurance.InsuranceID}</td>
                    <td>{insurance.InsuranceType}</td>
                    <td>
                      {insurance.PolicyStartDate} to {insurance.PolicyEndDate}
                    </td>
                    <td>{insurance.ClaimLimit}</td>
                    <td>
                      <Badge
                        style={{ fontSize: "0.9rem" }}
                        className={getRemainingClass(
                          insurance.RemainingClaimLimit,
                          insurance.ClaimLimit
                        )}
                      >
                        {insurance.RemainingClaimLimit}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
          <div className="mb-3">
            <p>
              <strong>Review Claim: </strong>
            </p>

          <Row>
            <Col>
              <Button variant="success" className="w-100" disabled={success || (claim.Status == "Rejected" | claim.Status == "Approved")} onClick={handleAccept}>
                Approve
              </Button>
            </Col>
            <Col>
              <Button variant="danger" className="w-100" disabled={success || (claim.Status == "Rejected" | claim.Status == "Approved")} onClick={handleReject} >
                Reject
              </Button>
            </Col>
          </Row>
          </div>
          <Alert variant="info" className="mt-3" show={success || (claim.Status == "Rejected" | claim.Status == "Approved")}>
                  Claim successfully reviewed
                </Alert> 

          {/* onSubmit={(e) => handleSubmit(e)} */}
          {/* <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  required
                  type="text"
                  maxLength="50"
                  defaultValue={claim.FirstName}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  required
                  type="text"
                  maxLength="50"
                  defaultValue={claim.LastName}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expense Date</Form.Label>
                <Form.Control
                  name="expenseDate"
                  required
                  type="date"
                  maxLength="255"
                  defaultValue={claim.ExpenseDate}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  required
                  type="number"
                  defaultValue={claim.Amount}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Purpose</Form.Label>
                <Form.Control
                  name="purpose"
                  required
                  type="text"
                  maxLength="255"
                  defaultValue={claim.Purpose}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Follow Up Required?</Form.Label>
                {claim && claim.FollowUp && (
                <Form.Select
                name="followUp"
                aria-label="Default select example"
                required
                defaultValue={claim.FollowUp}
              >
                <option value=""></option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
                )
                }
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Select Insurance Policy </Form.Label>
                {claim && claim.InsuranceID && (
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
                    {insurances.map((insurance, idx) => (
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
                          name="insurancePolicy"
                          value={insurance.InsuranceID}
                          defaultChecked={insurance.InsuranceID === claim.InsuranceID}
  
                        />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                )}
              </Form.Group>
              <Row>
                <Button variant="primary" type="submit">
                  Edit
                </Button>
              </Row>
               <Alert variant="danger" className="mt-3" show={showAlert}>
                  {alertMessage}
                </Alert>
                
                <Alert variant="success" className="mt-3" show={success}>
                  Successfully edited claim
                </Alert> 
            </Form> */}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditClaimComponent;
