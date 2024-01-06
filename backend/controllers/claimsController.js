const db = require('../db');

// Endpoint to get claim records for an employee
const getClaims = async (req, res) => {
  try {
    const employeeid = req.params.employeeid;
    const q = `
      SELECT
        IC.ClaimID,
        IC.InsuranceID,
        IC.FirstName,
        IC.LastName,
        IC.ExpenseDate,
        IC.Amount,
        IC.Purpose,
        IC.FollowUp,
        IC.PreviousClaimID,
        IC.Status,
        IC.LastEditedClaimDate
      FROM
        InsuranceClaims IC
      JOIN
        InsurancePolicies IP ON IC.InsuranceID = IP.InsuranceID
      WHERE
        IP.EmployeeID = ?;
    `;

    const claims = await db.query(q, [employeeid]);

    res.json(claims);
  } catch (error) {
    console.error(error);
  }
};

const createClaim = async (req,res) => {
    try {
        const {
            InsuranceID,
            FirstName,
            LastName,
            ExpenseDate,
            Amount,
            Purpose,
            FollowUp,
            PreviousClaimID,
            Status,
            LastEditedClaimDate
          } = req.body;
        
          const q = `
            INSERT INTO InsuranceClaims 
            (InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          const claim = await db.query(q, [InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate]);

          if (claim.affectedRows === 1) {
            // Successful insertion
            const insertedId = claim.insertId;
            console.log('Inserted ID:', insertedId);
            res.status(201).json({ message: 'New claim created successfully', insertedId });
          } else {
            // Unsuccessful insertion
            console.log('Insertion failed. No rows were affected.');
            res.status(400).json({ error: 'Failed to create a new claim' });
          }
    } catch(err) {
        console.log(err)
    }
};

const editClaim = async (req,res) => {
    try {
        const claimid = req.params.claimid;
        const { FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate } = req.body;

        const q = `
        UPDATE InsuranceClaims
        SET FirstName=?, LastName=?, ExpenseDate=?, Amount=?, Purpose=?, FollowUp=?, PreviousClaimID=?, Status=?, LastEditedClaimDate=?
        WHERE ClaimID=?
      `;
  
      // Execute the query
      await db.query(q, [FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate, claimid]);
  
      // Successful update
      res.status(200).json({ message: 'Claim updated successfully' });
    } catch(err) {
        console.log(err)
    }
};

const deleteClaim = async (req,res) => {
    try {
        const claimid = req.params.claimid;
        const q = 'DELETE FROM InsuranceClaims WHERE ClaimID = ?';
    
        // Execute the query
        await db.query(q, [claimid]);
    
        res.status(200).json({ message: 'Claim deleted successfully' });
    } catch(err) {
        console.log(err)
    }
}

module.exports = {getClaims, createClaim, editClaim, deleteClaim};
