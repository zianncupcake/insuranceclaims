import { Row, Col, Table, Button , Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


import { useState, useEffect } from "react";

const DasboardComponent = ({claims, deleteClaim, setClaims}) => {
    console.log(claims)

    const getStatusColorClass = (status) => {
        switch (status) {
          case 'Approved':
            return 'bg-success';
          case 'Pending':
            return 'bg-warning';
          case 'Rejected':
            return 'bg-danger';
          default:
            return '';
        }
      };

    const deleteHandler = (claimid) => {
        if (window.confirm("Are you sure?")) {
        deleteClaim(claimid)
        .then(res => {
            console.log(res)
            const updatedClaims = claims.filter((claim) => claim.ClaimID !== claimid);
            setClaims(updatedClaims)
            
        })
        .catch(er => console.log(er))

    }
}


  return (
    <Row className="justify-content-center mt-5 mb-10">
      <Col md={11} >
        <h1>
          My Claims {"    "}
          <LinkContainer to="/createclaim" >
            <Button variant="primary" size="lg" className="ms-3">
              Create New Claim
            </Button>
          </LinkContainer>
        </h1>
        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Insurance ID </th>
              <th>Expense Date</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Last Edited Date</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {claims?.map((claim, idx) => (
              <tr key={idx}>
                <td>{claim.ClaimID}</td>
                <td>{claim.InsuranceID}</td>
                <td>{claim.ExpenseDate}</td>
                <td style={{ maxWidth: "500px", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{claim.Purpose}</td>
                <td><Badge style={{ fontSize: '0.9rem'}} className={getStatusColorClass(claim.Status)}>{claim.Status}</Badge></td>
                <td>{claim.LastEditedClaimDate}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      </Row>
  );
};

export default DasboardComponent;

