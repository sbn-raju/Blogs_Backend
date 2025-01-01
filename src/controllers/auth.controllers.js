const { pool } = require('../database/db.connect.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => { 
    const { username, email, password } = req.body;

    //Validation wheather the name, email and password is correct or not.
    if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            message: 'Please enter all the fields'
        });
    }

    //Checking is the user already Exists or not
    const fetchUserQuery = "SELECT id FROM users WHERE username = $1";
    const fetchUserValues = [username];


    //Changing the password to the hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await pool.query(fetchUserQuery, fetchUserValues);

        if(user.rowCount != 0){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }else{
            const response = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, hashedPassword]
            );
            return res.status(200).json({
                succes: true,
                message: "User Resgistered Successfully"
            })
        }
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success: false,
        message: `Internal Server Error ${error}`
       });
    }
}



//This below API will login in the register.
const login = async(req, res) => {

    //Getting all the information the user from the frontend.
    const {username, password} = req.body;
    

    //Validation Check 
    if(!username || !password){
        return res.status(400).json({
            success: false,
            message: "Please check all your fields"
        })
    }

    //Checking in the database whater the user exists or not.
    const fetchUserQuery = "SELECT * FROM users WHERE username = $1";
    const fetchUserValue = [username];


    //If the user exists then make sure that he enters the correct password.
    try {
        const fetchUserResult = await pool.query(fetchUserQuery, fetchUserValue);
        
        if(fetchUserResult.rowCount != 0){

          //This will run onlu if the user exists.
          //Second steps is to compare the passwords.
          const user = fetchUserResult.rows[0];
          console.log(fetchUserResult.rows);

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res.status(401).json({
              success: false,
              message: "Invalid credentials",
            });
          }

          //construct the user data.
          const userData = {
            id: user.id,
            username: user.username
          };

          // Generate JWT token
          const token = jwt.sign(userData, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });


          return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user.email,
            token: token
          });
        }else{
            //This will run if the user does not exisits.
            return res.status(400).json({
                success: false,
                message: "User not Found",
              });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         success: false,
         message: `Internal Server Error ${error}`
        });
    }
}



module.exports = {
    register,
    login
}