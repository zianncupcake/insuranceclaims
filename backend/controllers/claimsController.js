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
            EmployeeID
          } = req.body;

        const queryExisitingClaims = `
        SELECT
          IC.ClaimID
        FROM
          InsuranceClaims IC
        JOIN
          InsurancePolicies IP ON IC.InsuranceID = IP.InsuranceID
        WHERE
          IP.EmployeeID = ?;
      `;
  
      const claims = await db.query(queryExisitingClaims, [EmployeeID]);
      const PreviousClaimID = (claims.length !== 0) ? claims[claims.length - 1].ClaimID : 0;
      const LastEditedClaimDate = new Date().toISOString().substring(0, 10);
        const Status = "Pending"


        
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

        const tempQuery = 'SELECT * FROM InsuranceClaims WHERE ClaimID = ?';
    
        // Execute the query
        const claim = await db.query(tempQuery, [claimid]);
        console.log("CLAIM CLAIM CLAIM CLAIM", claim)
        const PreviousClaimID = claim[0].PreviousClaimID
        const Status = claim[0].Status
        const LastEditedClaimDate = new Date().toISOString().substring(0, 10);




        const { FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, InsuranceID } = req.body;

        const q = `
        UPDATE InsuranceClaims
        SET FirstName=?, LastName=?, ExpenseDate=?, Amount=?, Purpose=?, FollowUp=?, PreviousClaimID=?, Status=?, LastEditedClaimDate=?, InsuranceID=?
        WHERE ClaimID=?
      `;
  console.log([FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate, InsuranceID, claimid])
      // Execute the query
      await db.query(q, [FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate, InsuranceID, claimid]);
  
      // Successful update
      res.status(200).json({ message: 'Claim updated successfully' });
    } catch(err) {
        console.log(err)
    }
};

const getClaim = async (req,res) => {
    try {
        const claimid = req.params.claimid;
        const q = 'SELECT * FROM InsuranceClaims WHERE ClaimID = ?';
    
        // Execute the query
        const claim = await db.query(q, [claimid]);
        // console.log("temp", claim)
        const temp = claim[0].FollowUp.readUInt8();
        // console.log(temp)
        claim[0].FollowUp = temp.toString()
        

    
        res.status(200).json(claim);
    } catch(err) {
        console.log(err)
    }
}


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

const adminGetClaims = async (req,res) => {
  try {
    const q = 'SELECT * FROM InsuranceClaims'
    const claims = await db.query(q);
    
    const updatedClaims = claims.map(claim => ({ ...claim, FollowUp: claim.FollowUp.readUInt8().toString() }));
    console.log(updatedClaims)
    res.json(updatedClaims);

  } catch(err) {
    console.log(err)
  }
}

const adminEditClaim = async (req,res) => {
  try {
    const claimid = req.query.claimid;
    const insuranceid = req.query.insuranceid;
    const {status, remainingClaimLimit} = req.body

    const q1 = `
    UPDATE InsuranceClaims
    SET Status=?
    WHERE ClaimID=?
  `;
  const q2 = `
  UPDATE InsurancePolicies
  SET RemainingClaimLimit = ?
  WHERE InsuranceID = ?
`;
  await db.query(q1, [status, claimid]);

  await db.query(q2, [remainingClaimLimit, insuranceid]);
  res.status(200).json({ message: 'updated successfully' });

  } catch(err) {
    console.log(err)
  }
}


module.exports = {getClaims, createClaim, editClaim, deleteClaim, getClaim, adminGetClaims, adminEditClaim};
