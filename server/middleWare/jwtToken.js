const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const jwtToken = async (req, res, next) => {
  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }
  jwt.verify(token, secretKey, (err, decoded) => {
  
    if (err) {
      return res.status(401).send("Invalid token.");
    }
    req.user = decoded;
    // console.log(decoded);
    next();
  });
};

module.exports = jwtToken;
