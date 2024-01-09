import { Row, Col, Table, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useState, useEffect } from "react";

const AdminComponent = ({ claims }) => {
  console.log(claims);
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

  {
    /* <div class="col-sm-9">
                        <button type="button" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        <div class="filter-group">
                            <label>Name</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="filter-group">
                            <label>Location</label>
                            <select class="form-control">
                                <option>All</option>
                                <option>Berlin</option>
                                <option>London</option>
                                <option>Madrid</option>
                                <option>New York</option>
                                <option>Paris</option>								
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Status</label>
                            <select class="form-control">
                                <option>Any</option>
                                <option>Delivered</option>
                                <option>Shipped</option>
                                <option>Pending</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                        <span class="filter-icon"><i class="fa fa-filter"></i></span>
                    </div> */
  }
  return (
    <Row className="justify-content-center mt-5">
      <Col md={11}>
        {/* <Row className="mb-3">
            <Col md={9}>
            </Col>
          <Col md={2}>
        <input type="text" class="form-control " defaultValue="Filter by name" />

          </Col>
          <Col md={1}>
          <Button className="btn btn-primary">
                          <i className="bi bi-search"></i>
                        </Button>
          </Col>
        </Row> */}
        <h1>Pending Claims {"    "}</h1>
        <Table className="mt-2 mb-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Insurance ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Expense Date</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Follow Up</th>
              <th>Previous Claim ID</th>
              <th>Status</th>
              <th>Last Edited Claim Date</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {claims &&
              claims
                .filter((claim) => claim.Status === "Pending")
                .map((claim, idx) => (
                  <tr key={idx}>
                    <td>{claim.ClaimID}</td>
                    <td>{claim.InsuranceID}</td>
                    <td>{claim.FirstName}</td>
                    <td>{claim.LastName}</td>
                    <td>{claim.ExpenseDate}</td>
                    <td>{claim.Amount}</td>
                    <td
                      style={{
                        maxWidth: "350px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {claim.Purpose}
                    </td>
                    <td>{claim.FollowUp}</td>
                    <td>{claim.PreviousClaimID}</td>
                    <td>
                      <Badge
                        style={{ fontSize: "0.9rem" }}
                        className={getStatusColorClass(claim.Status)}
                      >
                        {claim.Status}
                      </Badge>
                    </td>
                    <td>{claim.LastEditedClaimDate}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/admineditclaim/${claim.ClaimID}`}
                      >
                        <Button className="btn-sm">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
        <h1>Archived Claims {"    "}</h1>
        <Table className="mt-2 mb-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Insurance ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Expense Date</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Follow Up</th>
              <th>Previous Claim ID</th>
              <th>Status</th>
              <th>Last Edited Claim Date</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {claims &&
              claims
                .filter((claim) => claim.Status !== "Pending")
                .map((claim, idx) => (
                  <tr key={idx}>
                    <td>{claim.ClaimID}</td>
                    <td>{claim.InsuranceID}</td>
                    <td>{claim.FirstName}</td>
                    <td>{claim.LastName}</td>
                    <td>{claim.ExpenseDate}</td>
                    <td>{claim.Amount}</td>
                    <td
                      style={{
                        maxWidth: "350px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {claim.Purpose}
                    </td>
                    <td>{claim.FollowUp}</td>
                    <td>{claim.PreviousClaimID}</td>
                    <td>
                      <Badge
                        style={{ fontSize: "0.9rem" }}
                        className={getStatusColorClass(claim.Status)}
                      >
                        {claim.Status}
                      </Badge>
                    </td>
                    <td>{claim.LastEditedClaimDate}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/admineditclaim/${claim.ClaimID}`}
                      >
                        <Button className="btn-sm">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminComponent;
