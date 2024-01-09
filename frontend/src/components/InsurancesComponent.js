import { Row, Col, Table, Button , Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


import { useState, useEffect } from "react";

const InsurancesComponent = ({insurances}) => {
    console.log(insurances)

    const getStatusColorClass = (remainingClaimLimit, claimLimit) => {
        const percentage = (remainingClaimLimit / claimLimit) * 100;
      
        if (percentage >= 75) {
          return 'bg-success';
        } else if (percentage < 75 && percentage >=25 ) {
          return 'bg-warning';
        } else {
          return 'bg-danger';
        } 
      };
      

  return (
    <Row className="justify-content-center mt-5">
      <Col md={11} >
        <h1>
          My Insurances {"    "}
        </h1>
        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Insurance ID</th>
              <th>Insurance Type</th>
              <th>Policy Start Date</th>
              <th>Policy Term</th>
              <th>Policy End Date</th>
              <th>Claim Limit</th>
              <th>Remaining Claim Limit</th>

            </tr>
          </thead>
          <tbody>
            {insurances?.map((insurance, idx) => (
              <tr key={idx}>
                <td>{insurance.InsuranceID}</td>
                <td>{insurance.InsuranceType}</td>
                <td>{insurance.PolicyStartDate}</td>
                <td>{insurance.PolicyTerm}</td>
                <td>{insurance.PolicyEndDate}</td>
                <td>{insurance.ClaimLimit}</td>
                <td><Badge style={{ fontSize: '0.9rem'}} className={getStatusColorClass(insurance.RemainingClaimLimit,insurance.ClaimLimit)}>{insurance.RemainingClaimLimit}</Badge></td>
                {/* <td>
                  <LinkContainer to={`/editclaim/${claim.ClaimID}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {"  /  "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(claim.ClaimID)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      </Row>
  );
};

export default InsurancesComponent;

