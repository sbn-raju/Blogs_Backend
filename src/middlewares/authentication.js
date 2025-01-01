const jwt = require('jsonwebtoken');

//This middleware verifies that wheather the user token is valid or not.
const authentication = async (req, res, next) => {
    //Getting all the information data.
    const token = req.headers['authorization'];

    // console.log(token, req.headers);
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ 
                success: false, message: 'Invalid token: No user data' 
            });
        }

        console.log(decoded);
        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Token has expired' 
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, message: 'Invalid token' 
            });
        }
        
        console.error('Authentication error:', err);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
};


module.exports = authentication
