const db = require('../db');

// Endpoint to get claim records for an employee
const getInsurances = async (req, res) => {
  try {
    const employeeid = req.params.employeeid;
    const q = 'SELECT * FROM InsurancePolicies WHERE EmployeeID = ?';
    const insurances = await db.query(q, [employeeid]);

    res.json(insurances);
  } catch (error) {
    console.error(error);
  }
};

const getInsurance = async (req, res) => {
  try {
    const insuranceid = req.params.insuranceid;
    const q = 'SELECT * FROM InsurancePolicies WHERE InsuranceID = ?';
    const insurance = await db.query(q, [insuranceid]);

    res.json(insurance);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {getInsurances, getInsurance};
