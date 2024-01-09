const db = require("../db")

const getUsers = async (req, res) => {
  try {
    const q = 'SELECT * FROM user';
    const users = await db.query(q);
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const getUser = async (req,res) => {
    try {
        const id = req.params.id
        const q = `SELECT * FROM user WHERE employeeId = ${id}`;
        const user = await db.query(q);

        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        res.send(user);

    } catch (err) {
        console.log(err)
    }
}

const loginUser = async (req, res) => {
    try {
    console.log('Received a request to /api/users/login');
      const {firstName, lastName, password } = req.body;
  
      // Query the database to get user by firstName and lastName
      const q = 'SELECT * FROM claims.user WHERE firstName = ? AND lastName = ?';
      const user = await db.query(q, [firstName, lastName]);
      if (!user || user.length == 0) {
        // If user is not found, send an authentication failure response
        res.status(401).send('No user found');
        return;
      }
  
      // Compare the entered password with the hashed password in the database
  
      if (password != user[0].Password) {
        // If passwords do not match, send an authentication failure response
        res.status(401).send('Wrong password');
        return;
      }
  
      // At this point, authentication is successful
  
      // Optionally, you can send a success message or the user data in the response
      res.send({
        message: 'Log in successful',
        user: user,
      });
    } catch (error) {
      console.error(error);
    }
  };

module.exports= {getUsers, getUser, loginUser}